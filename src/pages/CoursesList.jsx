import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import CourseCard from '../components/CourseCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { courseAPI } from '../services/api';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSetupError, setIsSetupError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  // For race condition handling
  const abortControllerRef = useRef(null);
  const loadingPagesRef = useRef(new Set());
  const lastLoadMoreCallRef = useRef(0);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await courseAPI.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Reset courses when search or filter changes
  useEffect(() => {
    setCourses([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    setIsSetupError(false);
    // Clear loading pages set
    loadingPagesRef.current.clear();
  }, [searchTerm, selectedCategory]);

  const loadCourses = useCallback(async (page = 1, append = false, currentSearchTerm = searchTerm, currentCategory = selectedCategory) => {
    // Prevent duplicate requests for the same page
    if (loadingPagesRef.current.has(page)) {
      console.log('Page', page, 'is already loading, skipping duplicate request');
      return;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    // Mark this page as loading
    loadingPagesRef.current.add(page);
    setLoading(true);
    setError(null);

    try {
      const response = await courseAPI.getCourses(page, 6, currentSearchTerm, currentCategory);
      
      // Check if we have more data - if we get less than 6 items, we've reached the end
      const hasMoreData = response.length === 6;
      setHasMore(hasMoreData);

      if (append) {
        setCourses(prev => [...prev, ...response]);
      } else {
        setCourses(response);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        // Check if it's a setup/configuration error
        if (error.message.includes('Failed to fetch courses') && error.message.includes('404')) {
          setError('Failed to load courses. Please try again.');
          setIsSetupError(false);
        } else if (error.message.includes('Failed to fetch courses')) {
          setError('Failed to load courses. Please try again.');
          setIsSetupError(true);
        } else {
          setError('Failed to load courses. Please try again.');
          setIsSetupError(false);
        }
        console.error('Error loading courses:', error);
      }
    } finally {
      // Remove this page from loading set
      loadingPagesRef.current.delete(page);
      setLoading(false);
    }
  }, []);

  // Load initial courses
  useEffect(() => {
    loadCourses(1, false, searchTerm, selectedCategory);
  }, [loadCourses, searchTerm, selectedCategory]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilter = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const loadMoreItems = useCallback(async (startIndex) => {
    const now = Date.now();
    const nextPage = Math.floor(startIndex / 6) + 1;
    
    // Debounce rapid successive calls (minimum 500ms between calls)
    if (now - lastLoadMoreCallRef.current < 500) {
      console.log('Debouncing loadMoreItems call');
      return;
    }
    lastLoadMoreCallRef.current = now;
    
    // Prevent loading if already loading this page or if it's not the next page
    if (nextPage > currentPage && !loadingPagesRef.current.has(nextPage)) {
      setCurrentPage(nextPage);
      await loadCourses(nextPage, true, searchTerm, selectedCategory);
    }
  }, [currentPage, loadCourses, searchTerm, selectedCategory]);

  const isItemLoaded = useCallback((index) => {
    return index < courses.length;
  }, [courses.length]);

  // Memoize the Row component to prevent unnecessary re-renders
  const Row = useMemo(() => {
    return ({ index, style }) => {
      // Check if item is loaded by directly checking courses array
      if (index >= courses.length) {
        return (
          <div key={`loading-${index}`} style={style} className="flex justify-center items-center h-64 p-4">
            <div className="w-full h-64 bg-white rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        );
      }

      const course = courses[index];
      if (!course) return null;

      return (
        <div key={course.id} style={style} className="p-4">
          <CourseCard course={course} />
        </div>
      );
    };
  }, [courses]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Explore Courses
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center my-8 animate-scale-in">
          <div className="text-red-600 text-xl font-semibold mb-4">
            {isSetupError ? 'Setup Required' : 'Error Loading Courses'}
          </div>
          <div className="text-gray-600 mb-6 mobile-optimized">{error}</div>
          
          {isSetupError && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4 text-left">
              <h3 className="text-blue-800 font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                To get started:
              </h3>
              <ol className="ml-6 text-gray-700 space-y-2 mobile-optimized">
                <li>Go to <a href="https://mockapi.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">MockAPI</a> and create a new project</li>
                <li>Create a resource called <code className="bg-gray-100 px-2 py-1 rounded text-sm">courses</code> with the schema from the README</li>
                <li>Add sample data (use the <code className="bg-gray-100 px-2 py-1 rounded text-sm">sample-data.json</code> file)</li>
                <li>Copy your MockAPI URL</li>
                <li>Update <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/services/api.js</code> with your URL</li>
              </ol>
            </div>
          )}
          
          <button
            onClick={() => loadCourses(1, false, searchTerm, selectedCategory)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mobile-touch-target font-medium"
          >
            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Explore Courses
      </h1>
      
      <SearchAndFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
        selectedCategory={selectedCategory}
      />

      {courses.length === 0 && !loading ? (
        <div className="text-center py-16 animate-scale-in">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-gray-500 text-lg mb-4 font-medium">
              {searchTerm || selectedCategory ? 'No courses found matching your criteria.' : 'No courses available.'}
            </div>
            <div className="text-gray-400 text-sm mobile-optimized">
              {searchTerm || selectedCategory ? (
                <>
                  Try adjusting your search term or filter criteria.
                  <br />
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="text-blue-600 hover:text-blue-800 underline mt-2 mobile-touch-target"
                  >
                    Clear all filters
                  </button>
                </>
              ) : (
                'Please check back later or contact support if this persists.'
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 animate-slide-in">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={hasMore ? courses.length + 6 : courses.length}
            loadMoreItems={loadMoreItems}
            threshold={2}
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={ref}
                height={800}
                itemCount={hasMore ? courses.length + 6 : courses.length}
                itemSize={450}
                onItemsRendered={onItemsRendered}
                width="100%"
                overscanCount={3}
                useIsScrolling={false}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        </div>
      )}

      {loading && courses.length === 0 && (
        <div className="text-center py-12 animate-pulse-slow">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-500 text-lg font-medium">Loading courses...</div>
          <div className="text-gray-400 text-sm mt-2 mobile-optimized">Please wait while we fetch the latest courses</div>
        </div>
      )}

      {/* Course count indicator */}
      {courses.length > 0 && (
        <div className="mt-6 text-center animate-scale-in">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
            {hasMore && ' (scroll for more)'}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList; 
import { useState, useEffect, useCallback, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import CourseCard from '../components/CourseCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { courseAPI } from '../services/api';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  // For race condition handling
  const abortControllerRef = useRef(null);

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
  }, [searchTerm, selectedCategory]);

  const loadCourses = useCallback(async (page = 1, append = false) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await courseAPI.getCourses(page, 6, searchTerm, selectedCategory);
      
      // Check if we have more data
      const hasMoreData = response.length === 6;
      setHasMore(hasMoreData);

      if (append) {
        setCourses(prev => [...prev, ...response]);
      } else {
        setCourses(response);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError('Failed to load courses. Please try again.');
        console.error('Error loading courses:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  // Load initial courses
  useEffect(() => {
    loadCourses(1, false);
  }, [loadCourses]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilter = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const loadMoreItems = useCallback(async (startIndex, stopIndex) => {
    const nextPage = Math.floor(startIndex / 6) + 1;
    if (nextPage > currentPage) {
      setCurrentPage(nextPage);
      await loadCourses(nextPage, true);
    }
  }, [currentPage, loadCourses]);

  const isItemLoaded = useCallback((index) => {
    return !hasMore || index < courses.length;
  }, [hasMore, courses.length]);

  const Row = useCallback(({ index, style }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="flex justify-center items-center h-64">
          <div className="animate-pulse bg-gray-200 rounded-lg w-full h-64"></div>
        </div>
      );
    }

    const course = courses[index];
    if (!course) return null;

    return (
      <div style={style} className="p-2">
        <CourseCard course={course} />
      </div>
    );
  }, [courses, isItemLoaded]);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => loadCourses(1, false)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Courses</h1>
      
      <SearchAndFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        categories={categories}
        selectedCategory={selectedCategory}
      />

      {courses.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No courses found.</div>
          <div className="text-gray-400 text-sm mt-2">
            Try adjusting your search or filter criteria.
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={hasMore ? courses.length + 6 : courses.length}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={ref}
                height={800}
                itemCount={hasMore ? courses.length + 6 : courses.length}
                itemSize={400}
                onItemsRendered={onItemsRendered}
                width="100%"
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        </div>
      )}

      {loading && courses.length === 0 && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <div className="text-gray-500 mt-2">Loading courses...</div>
        </div>
      )}
    </div>
  );
};

export default CoursesList; 
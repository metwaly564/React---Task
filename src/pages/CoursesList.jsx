import { useState, useEffect, useCallback, useRef } from "react";
import CourseCard from "../components/CourseCard";
import SearchAndFilter from "../components/SearchAndFilter";
import { courseAPI } from "../services/api";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSetupError, setIsSetupError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  // Reset courses when search or filter changes
  useEffect(() => {
    setCourses([]);
    setCurrentPage(1);
    setError(null);
    setIsSetupError(false);
  }, [searchTerm, selectedCategory]);

  const loadCourses = useCallback(
    async (
      page = 1,
      currentSearchTerm = searchTerm,
      currentCategory = selectedCategory
    ) => {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const response = await courseAPI.getCourses(
          page,
          6,
          currentSearchTerm,
          currentCategory
        );

        // For pagination, we'll assume we have more pages if we get exactly 6 items
        // In a real API, you'd get total count from the response
        const hasMorePages = response.length === 6;
        setTotalPages(hasMorePages ? page + 1 : page);

        setCourses(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          // Check if it's a setup/configuration error
          if (
            error.message.includes("Failed to fetch courses") &&
            error.message.includes("404")
          ) {
            setError("Failed to load courses. Please try again.");
            setIsSetupError(false);
          } else if (error.message.includes("Failed to fetch courses")) {
            setError("Failed to load courses. Please try again.");
            setIsSetupError(true);
          } else {
            setError("Failed to load courses. Please try again.");
            setIsSetupError(false);
          }
          console.error("Error loading courses:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load courses when page, search, or filter changes
  useEffect(() => {
    loadCourses(currentPage, searchTerm, selectedCategory);
  }, [loadCourses, currentPage, searchTerm, selectedCategory]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilter = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mobile-touch-target"
      >
        Previous
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-50 cursor-pointer mobile-touch-target"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span
            key="ellipsis1"
            className="px-3 py-2 text-sm text-gray-500 bg-white border-t border-b border-gray-300"
          >
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 cursor-pointer mobile-touch-target ${
            i === currentPage
              ? "text-blue-600 bg-blue-50 border-blue-500"
              : "text-gray-500 bg-white hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span
            key="ellipsis2"
            className="px-3 py-2 text-sm text-gray-500 bg-white border-t border-b border-gray-300"
          >
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-50 cursor-pointer mobile-touch-target"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mobile-touch-target"
      >
        Next
      </button>
    );

    return (
      <div className="flex justify-center mt-8 animate-scale-in">
        <nav className="flex items-center space-x-0" aria-label="Pagination">
          {pages}
        </nav>
      </div>
    );
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <svg
            className="w-8 h-8 mr-3 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Explore Courses
        </h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center my-8 animate-scale-in">
          <div className="text-red-600 text-xl font-semibold mb-4">
            {isSetupError ? "Setup Required" : "Error Loading Courses"}
          </div>
          <div className="text-gray-600 mb-6 mobile-optimized">{error}</div>

          {isSetupError && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4 text-left">
              <h3 className="text-blue-800 font-semibold mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                To get started:
              </h3>
              <ol className="ml-6 text-gray-700 space-y-2 mobile-optimized">
                <li>
                  Go to{" "}
                  <a
                    href="https://mockapi.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    MockAPI
                  </a>{" "}
                  and create a new project
                </li>
                <li>
                  Create a resource called{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    courses
                  </code>{" "}
                  with the schema from the README
                </li>
                <li>
                  Add sample data (use the{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    sample-data.json
                  </code>{" "}
                  file)
                </li>
                <li>Copy your MockAPI URL</li>
                <li>
                  Update{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    src/services/api.js
                  </code>{" "}
                  with your URL
                </li>
              </ol>
            </div>
          )}

          <button
            onClick={() =>
              loadCourses(currentPage, searchTerm, selectedCategory)
            }
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mobile-touch-target font-medium"
          >
            <svg
              className="w-5 h-5 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
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
        <svg
          className="w-8 h-8 mr-3 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
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
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-lg mb-4 font-medium">
              {searchTerm || selectedCategory
                ? "No courses found matching your criteria."
                : "No courses available."}
            </div>
            <div className="text-gray-400 text-sm mobile-optimized">
              {searchTerm || selectedCategory ? (
                <>
                  Try adjusting your search term or filter criteria.
                  <br />
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                    }}
                    className="text-blue-600 hover:text-blue-800 underline mt-2 mobile-touch-target"
                  >
                    Clear all filters
                  </button>
                </>
              ) : (
                "Please check back later or contact support if this persists."
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 animate-slide-in">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-64 bg-white rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="p-0">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {renderPagination()}

      {/* Course count indicator */}
      {courses.length > 0 && (
        <div className="mt-6 text-center animate-scale-in">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Page {currentPage} of {totalPages} • Showing {courses.length} course
            {courses.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList;

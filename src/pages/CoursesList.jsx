// Import React hooks and components
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import SearchAndFilter from "../components/SearchAndFilter";

// CoursesList page component
const CoursesList = () => {
  // State for courses, search, and categories
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Load categories and courses on mount
  useEffect(() => {
    fetch("https://6873dfedc75558e273558266.mockapi.io/api/v1/courses/")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        const cats = Array.from(new Set(data.map(course => course.category)));
        setCategories(cats);
      })
      .catch(() => {
        setCourses([]);
        setCategories([]);
      });
  }, []);

  // Filtered courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) 
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handlers for search and filter
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

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

      {filteredCourses.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginatedCourses.map((course) => (
              <div key={course.id} className="p-0">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
              >
                Previous
              </button>
              {/* Pagination window logic */}
              {(() => {
                const pageWindow = 2; // pages before/after current
                const pages = [];
                let start = Math.max(2, currentPage - pageWindow);
                let end = Math.min(totalPages - 1, currentPage + pageWindow);
                // Always show first page
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                  >
                    1
                  </button>
                );
                // Ellipsis if needed
                if (start > 2) {
                  pages.push(<span key="start-ellipsis" className="px-2">...</span>);
                }
                // Page window
                for (let i = start; i <= end; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`px-3 py-1 rounded border ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                    >
                      {i}
                    </button>
                  );
                }
                // Ellipsis if needed
                if (end < totalPages - 1) {
                  pages.push(<span key="end-ellipsis" className="px-2">...</span>);
                }
                // Always show last page if more than 1
                if (totalPages > 1) {
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                    >
                      {totalPages}
                    </button>
                  );
                }
                return pages;
              })()}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesList;

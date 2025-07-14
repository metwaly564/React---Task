// Import React hooks and components
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import SearchAndFilter from "../components/SearchAndFilter";
import sampleData from "../../sample-data.json";

// CoursesList page component
const CoursesList = () => {
  // State for courses, search, and categories
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Load categories and courses on mount
  useEffect(() => {
    setCourses(sampleData);
    const cats = Array.from(new Set(sampleData.map(course => course.category)));
    setCategories(cats);
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
            {filteredCourses.map((course) => (
              <div key={course.id} className="p-0">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList;

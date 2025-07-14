// Import React hooks and memo for optimization
import { useState, useEffect, memo } from 'react';

// Search and filter component for courses
const SearchAndFilter = memo(({ onSearch, onFilter, categories, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search value
  const [isSearching, setIsSearching] = useState(false); // Loading state for search
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown open state

  // Debounce search input (500ms delay)
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log(category);
    onFilter(category);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Clear category filter
  const clearFilter = () => {
    onFilter('');
  };

  return (
    <div className="mb-6 space-y-4 animate-slide-in">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Courses
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or teacher..."
              className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mobile-touch-target cursor-pointer focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Search indicator */}
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {/* Clear search button */}
            {searchTerm && !isSearching && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors mobile-touch-target"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:w-64">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setIsDropdownOpen(false)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mobile-touch-target appearance-none bg-white cursor-pointer focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory) && (
        <div className="flex flex-wrap gap-2 animate-scale-in">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-blue-100 text-blue-800 font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              "{searchTerm}"
              <button
                onClick={clearSearch}
                className="ml-2 text-blue-600 hover:text-blue-800 transition-colors mobile-touch-target"
                title="Clear search"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-green-100 text-green-800 font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {selectedCategory}
              <button
                onClick={clearFilter}
                className="ml-2 text-green-600 hover:text-green-800 transition-colors mobile-touch-target"
                title="Clear filter"
              >
                ×
              </button>
            </span>
          )}
          
          {/* Clear all filters button */}
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                clearSearch();
                clearFilter();
              }}
              className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors mobile-touch-target"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchAndFilter; 
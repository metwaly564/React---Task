// Import React hooks and router utilities
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Import custom hook for accessing bookmarks context
import BookmarkContext from '../context/BookmarkContext';

// Navbar component for site navigation
const Navbar = () => {
  const location = useLocation(); // Get current route location
  const { bookmarks } = useContext(BookmarkContext); // Get bookmarks from context
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Helper to check if a nav link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // Main navigation bar
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site title */}
          <Link 
            to="/" 
            className="text-xl font-bold hover:text-blue-200 transition-colors duration-200 animate-fade-in"
          >
            <div className="flex items-center">
              {/* Logo SVG */}
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              {/* Responsive site title */}
              <span className="hidden sm:inline">Course Explorer</span>
              <span className="sm:hidden">Courses</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {/* Courses link */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 mobile-touch-target ${
                isActive('/') 
                  ? 'bg-blue-700 text-white shadow-md' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                {/* Home icon */}
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Courses
              </div>
            </Link>
            
            {/* Bookmarks link with badge */}
            <Link
              to="/bookmarks"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 mobile-touch-target relative ${
                isActive('/bookmarks') 
                  ? 'bg-blue-700 text-white shadow-md' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                {/* Bookmark icon */}
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>Bookmarks</span>
                {/* Show badge if bookmarks exist */}
                {bookmarks.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in font-bold">
                    {bookmarks.length}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile menu button (hamburger) */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="mobile-touch-target p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  // Close icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (shown when open) */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700 rounded-lg mt-2 shadow-lg">
              {/* Mobile Courses link */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mobile-touch-target ${
                  isActive('/') 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Courses
                </div>
              </Link>
              
              {/* Mobile Bookmarks link with badge */}
              <Link
                to="/bookmarks"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mobile-touch-target ${
                  isActive('/bookmarks') 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    <span>Bookmarks</span>
                  </div>
                  {/* Show badge if bookmarks exist */}
                  {bookmarks.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-scale-in font-bold">
                      {bookmarks.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
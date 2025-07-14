// Import Link for navigation, memo for optimization, and bookmark context
import { Link } from 'react-router-dom';
import useBookmarks from '../context/useBookmarks'; // Custom hook for bookmarks
import { memo } from 'react';
import localImage from '../assets/Gemini_Generated_Image_59a5n359a5n359a5.png';

// Memoized CourseCard for performance
const CourseCard = memo(({ course }) => {
  // Get bookmark utilities from context
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(course.id);

  // Handle bookmark button click
  const handleBookmarkClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    toggleBookmark(course); // Toggle bookmark state
  };

  return (
    // Card container
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift animate-fade-in">
      <div className="relative group">
        {/* Course image with link to details */}
        <Link to={`/course/${course.id}`} className="block">
          <img
            src={localImage}
            alt={course.title}
            className="w-full h-48 object-cover cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300"
          />
        </Link>
      
        {/* Overlay on hover (optional, can add effects here) */}
      </div>
      
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3">
          {/* Course category badge */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {course.category}
          </span>
          {/* Number of lessons */}
          <div className="text-xs text-gray-500 mobile-optimized">
            {course.lessons?.length || 0} lessons
          </div>
        </div>
        
        {/* Course title with link */}
        <Link to={`/course/${course.id}`} className="block">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            {course.title}
          </h3>
        </Link>
        
        {/* Course description (truncated) */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed mobile-optimized" style={{height: '44px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          {/* Teacher info */}
          <div className="flex items-center text-sm text-gray-500 mobile-optimized">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{course.teacher}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Secondary bookmark button (bottom right) */}
            <button
              onClick={handleBookmarkClick}
              className={`p-2 rounded-full transition-all duration-200 mobile-touch-target ${
                bookmarked
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-yellow-600'
              }`}
              title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              {bookmarked ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              )}
            </button>
            
            {/* View details link */}
            <Link
              to={`/course/${course.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 mobile-touch-target px-3 py-2 rounded-md hover:bg-blue-50"
            >
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">Details</span>
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CourseCard; 
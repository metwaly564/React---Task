import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { memo } from 'react';
import localImage from '../assets/Gemini_Generated_Image_59a5n359a5n359a5.png';

const CourseCard = memo(({ course }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(course.id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(course);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift animate-fade-in">
      <div className="relative group">
        <Link to={`/course/${course.id}`} className="block">
          <img
            src={localImage}
            alt={course.title}
            className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
          />
        </Link>
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 p-3 rounded-full transition-all duration-300 mobile-touch-target shadow-lg z-10 ${
            bookmarked
              ? 'bg-yellow-400 text-yellow-800 hover:bg-yellow-500 hover:scale-110'
              : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 hover:scale-110 border border-gray-200'
          }`}
          title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          {bookmarked ? (
            // Filled bookmark icon
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          ) : (
            // Outline bookmark icon
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          )}
        </button>
        
      
        
        {/* Overlay on hover */}
      </div>
      
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {course.category}
          </span>
          <div className="text-xs text-gray-500 mobile-optimized">
            {course.lessons?.length || 0} lessons
          </div>
        </div>
        
        <Link to={`/course/${course.id}`} className="block">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed mobile-optimized">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 mobile-optimized">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{course.teacher}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Secondary bookmark button */}
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
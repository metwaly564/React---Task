import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';

const CourseCard = ({ course }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(course.id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(course);
  };

  // Better fallback images based on category
  const getFallbackImage = (category) => {
    // Simple data URL as ultimate fallback
    const dataUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBJbWFnZTwvdGV4dD4KPC9zdmc+';
    
    const categoryImages = {
      'Frontend': 'https://picsum.photos/400/300?random=1',
      'Backend': 'https://picsum.photos/400/300?random=2',
      'JavaScript': 'https://picsum.photos/400/300?random=3',
      'Data Science': 'https://picsum.photos/400/300?random=4',
      'Mobile': 'https://picsum.photos/400/300?random=5',
      'Full Stack': 'https://picsum.photos/400/300?random=6',
      'Design': 'https://picsum.photos/400/300?random=7',
      'DevOps': 'https://picsum.photos/400/300?random=8'
    };
    
    return categoryImages[category] || dataUrl;
  };

  const handleImageError = (e) => {
    console.log('Image failed to load, using fallback for category:', course.category);
    e.target.src = getFallbackImage(course.category);
  };

  // Force use fallback images for now to debug
  const imageUrl = getFallbackImage(course.category);
  console.log('Course:', course.title, 'Category:', course.category, 'Image URL:', imageUrl);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift animate-fade-in">
      <div className="relative group">
        <div 
          className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <img
            src={imageUrl}
            alt={course.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
            crossOrigin="anonymous"
            style={{ display: 'none' }} // Hide the img element and use background instead
          />
          <span className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
            {course.category}
          </span>
        </div>
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
        
        {/* Bookmark tooltip */}
        <div className="absolute top-12 right-3 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
          {bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
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
        
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>
        
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
};

export default CourseCard; 
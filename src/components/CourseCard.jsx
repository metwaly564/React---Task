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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={course.image_source || 'https://via.placeholder.com/300x200?text=Course+Image'}
          alt={course.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Course+Image';
          }}
        />
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            bookmarked
              ? 'bg-yellow-400 text-yellow-800 hover:bg-yellow-500'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          <svg
            className="w-5 h-5"
            fill={bookmarked ? 'currentColor' : 'none'}
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
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {course.teacher}
          </div>
          
          <Link
            to={`/course/${course.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 
import { useBookmarks } from '../context/BookmarkContext';
import CourseCard from '../components/CourseCard';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  const handleRemoveBookmark = (courseId) => {
    removeBookmark(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <svg className="w-8 h-8 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        My Bookmarks
      </h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-16 animate-scale-in">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 max-w-md mx-auto">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="text-gray-500 text-lg mb-4 font-medium">No bookmarked courses yet.</div>
            <div className="text-gray-400 text-sm mb-6 mobile-optimized">
              Start exploring courses and bookmark your favorites!
            </div>
            <a 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mobile-touch-target px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Courses
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 animate-slide-in">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium mobile-optimized">
                    You have {bookmarks.length} bookmarked course{bookmarks.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-blue-600 text-sm mobile-optimized">
                  {bookmarks.length} total
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 tablet-grid">
            {bookmarks.map((course, index) => (
              <div 
                key={course.id} 
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard course={course} />
                <button
                  onClick={() => handleRemoveBookmark(course.id)}
                  className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 mobile-touch-target shadow-lg hover:scale-110"
                  title="Remove from bookmarks"
                  aria-label="Remove from bookmarks"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Remove confirmation tooltip */}
                <div className="absolute top-12 left-4 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Remove bookmark
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick actions */}
          <div className="mt-8 text-center animate-scale-in">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    // Clear all bookmarks
                    bookmarks.forEach(course => removeBookmark(course.id));
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 mobile-touch-target text-sm font-medium"
                >
                  Clear All Bookmarks
                </button>
                <a
                  href="/"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 mobile-touch-target text-sm font-medium"
                >
                  Browse More Courses
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmarks; 
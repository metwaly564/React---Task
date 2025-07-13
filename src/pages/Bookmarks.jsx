import { useBookmarks } from '../context/BookmarkContext';
import CourseCard from '../components/CourseCard';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  const handleRemoveBookmark = (courseId) => {
    removeBookmark(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookmarks</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No bookmarked courses yet.</div>
          <div className="text-gray-400 text-sm mb-6">
            Start exploring courses and bookmark your favorites!
          </div>
          <div className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Browse Courses</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-gray-600">
              You have {bookmarks.length} bookmarked course{bookmarks.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                <button
                  onClick={() => handleRemoveBookmark(course.id)}
                  className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                  title="Remove from bookmarks"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookmarks; 
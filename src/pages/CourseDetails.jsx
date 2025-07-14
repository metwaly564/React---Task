// Import React hooks, router utilities, and custom hooks
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBookmarks from '../context/useBookmarks'; // Custom hook for bookmarks
import sampleData from '../../sample-data.json';
import Dummyimage from '../assets/Gemini_Generated_Image_59a5n359a5n359a5.png';

// CourseDetails page component
const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null); // State for course data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { isBookmarked, toggleBookmark } = useBookmarks(); // Bookmark utilities

  // Scroll to top when component mounts or course ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Fetch course details from sample data
  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundCourse = sampleData.find(c => String(c.id) === String(id));
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      setCourse(null);
      setError('Failed to load course details. Please try again.');
    }
    setLoading(false);
  }, [id]);

  // Handle bookmark button click
  const handleBookmarkClick = () => {
    if (course) {
      toggleBookmark(course);
    }
  };

  // Format duration in hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Show loading skeleton
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if loading fails
  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8 animate-fade-in">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="text-red-600 text-xl font-semibold mb-4">{error}</div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mobile-touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Show not found message if course is missing
  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8 animate-fade-in">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <div className="text-gray-500 text-xl mb-4">Course not found.</div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mobile-touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const bookmarked = isBookmarked(course.id);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200 mobile-touch-target px-3 py-2 rounded-lg hover:bg-blue-50"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Back to Courses</span>
        <span className="sm:hidden">Back</span>
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 hover-lift">
        <div className="relative group">
          <img
            src={Dummyimage}
            alt={course.title}
            className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Course+Image';
            }}
          />
          <button
            onClick={handleBookmarkClick}
            className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 mobile-touch-target shadow-lg ${
              bookmarked
                ? 'bg-yellow-400 text-yellow-800 hover:bg-yellow-500 hover:scale-110'
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-yellow-600 hover:scale-110'
            }`}
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            {bookmarked ? (
              // Filled bookmark icon
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            ) : (
              // Outline bookmark icon
              <svg
                className="w-6 h-6"
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
          
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium w-fit">
              {course.category}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="mobile-optimized">{course.teacher}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {course.title}
          </h1>
          
          <p className="text-gray-700 leading-relaxed mb-6 mobile-optimized">
            {course.description}
          </p>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              <div className="text-2xl font-bold text-blue-600">
                {course.lessons?.length || 0}
              </div>
              <div className="text-sm text-gray-500 mobile-optimized">Total Lessons</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
              <div className="text-2xl font-bold text-green-600">
                {course.lessons?.reduce((total, lesson) => total + lesson.duration, 0) || 0}
              </div>
              <div className="text-sm text-gray-500 mobile-optimized">Total Minutes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              <div className="text-2xl font-bold text-purple-600">
                {course.lessons?.reduce((total, lesson) => total + (lesson.videos_count || 0), 0) || 0}
              </div>
              <div className="text-sm text-gray-500 mobile-optimized">Total Videos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      {course.lessons && course.lessons.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 hover-lift animate-scale-in">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Course Lessons
          </h2>
          
          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover-lift"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate mobile-optimized">{lesson.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm0 6a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V8zm0 6a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                        </svg>
                        <span>{formatDuration(lesson.duration)}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm3 9a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                        </svg>
                        <span>{lesson.videos_count || 0} videos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails; 
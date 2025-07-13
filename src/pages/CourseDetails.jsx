import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { courseAPI } from '../services/api';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const courseData = await courseAPI.getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        setError('Failed to load course details. Please try again.');
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCourse();
    }
  }, [id]);

  const handleBookmarkClick = () => {
    if (course) {
      toggleBookmark(course);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <div className="text-gray-500 mb-4">Course not found.</div>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(course.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative">
          <img
            src={course.image_source || 'https://via.placeholder.com/800x400?text=Course+Image'}
            alt={course.title}
            className="w-full h-64 md:h-80 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Course+Image';
            }}
          />
          <button
            onClick={handleBookmarkClick}
            className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
              bookmarked
                ? 'bg-yellow-400 text-yellow-800 hover:bg-yellow-500'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <svg
              className="w-6 h-6"
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

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {course.category}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {course.teacher}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {course.lessons?.length || 0}
              </div>
              <div className="text-sm text-gray-500">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {course.lessons?.reduce((total, lesson) => total + lesson.duration, 0) || 0}
              </div>
              <div className="text-sm text-gray-500">Total Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {course.lessons?.reduce((total, lesson) => total + (lesson.videos_count || 0), 0) || 0}
              </div>
              <div className="text-sm text-gray-500">Total Videos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      {course.lessons && course.lessons.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
          
          <div className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDuration(lesson.duration)}
                      {lesson.videos_count && (
                        <>
                          <span className="mx-2">•</span>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {lesson.videos_count} videos
                        </>
                      )}
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
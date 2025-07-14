import { createContext, useState, useEffect, useMemo } from 'react';

// Create a context for bookmarks
const BookmarkContext = createContext();

// Provider component to wrap the app and provide bookmark state
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]); // State for bookmarked courses

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('courseBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('courseBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Add a course to bookmarks
  const addBookmark = (course) => {
    setBookmarks(prev => {
      const exists = prev.find(bookmark => bookmark.id === course.id);
      if (!exists) {
        return [...prev, course];
      }
      return prev;
    });
  };

  // Remove a course from bookmarks by ID
  const removeBookmark = (courseId) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== courseId));
  };

  // Check if a course is bookmarked
  const isBookmarked = (courseId) => {
    return bookmarks.some(bookmark => bookmark.id === courseId);
  };

  // Toggle bookmark status for a course
  const toggleBookmark = (course) => {
    if (isBookmarked(course.id)) {
      removeBookmark(course.id);
    } else {
      addBookmark(course);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark
  }), [bookmarks]);

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Export the context for use in the custom hook
export default BookmarkContext; 
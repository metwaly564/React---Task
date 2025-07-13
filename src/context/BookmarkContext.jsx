import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

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

  const addBookmark = (course) => {
    setBookmarks(prev => {
      const exists = prev.find(bookmark => bookmark.id === course.id);
      if (!exists) {
        return [...prev, course];
      }
      return prev;
    });
  };

  const removeBookmark = (courseId) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== courseId));
  };

  const isBookmarked = (courseId) => {
    return bookmarks.some(bookmark => bookmark.id === courseId);
  };

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
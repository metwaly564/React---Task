// Custom hook to use the bookmark context
import { useContext } from 'react';
import BookmarkContext from './BookmarkContext';

// Hook to access bookmark context values and actions
const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export default useBookmarks; 
import { Link, useLocation } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';

const Navbar = () => {
  const location = useLocation();
  const { bookmarks } = useBookmarks();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
            Course Explorer
          </Link>
          
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              Courses
            </Link>
            
            <Link
              to="/bookmarks"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('/bookmarks') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              Bookmarks
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
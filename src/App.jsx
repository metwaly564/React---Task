// Import necessary modules from React Router for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import custom components
import Navbar from './components/Navbar';
import CoursesList from './pages/CoursesList';
import CourseDetails from './pages/CourseDetails';
import Bookmarks from './pages/Bookmarks';
// Import context provider for bookmarks
import { BookmarkProvider } from './context/BookmarkContext';
// Import global styles
import './App.css';

// Main App component
function App() {
  return (
    // Provide bookmark context to the entire app
    <BookmarkProvider>
      {/* Set up routing for the app */}
      <Router>
        <div className="App">
          {/* Navigation bar at the top */}
          <Navbar />
          {/* Main content area with page routes */}
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Home page: list of courses */}
              <Route path="/" element={<CoursesList />} />
              {/* Course details page */}
              <Route path="/course/:id" element={<CourseDetails />} />
              {/* Bookmarks page */}
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default App;

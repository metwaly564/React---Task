import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CoursesList from './pages/CoursesList';
import CourseDetails from './pages/CourseDetails';
import Bookmarks from './pages/Bookmarks';
import { BookmarkProvider } from './context/BookmarkContext';
import './App.css';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<CoursesList />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default App;

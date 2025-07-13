import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import Bookmarks from './components/Bookmarks';
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

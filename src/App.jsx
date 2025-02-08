import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import { BookOpen, Layout, User } from 'lucide-react';

const Navigation = () => (
  <nav className="bg-white shadow-md">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <BookOpen className="w-6 h-6 mr-2" />
          CourseHub
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
            <Layout className="w-5 h-5 mr-1" />
            Courses
          </Link>
          <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600">
            <User className="w-5 h-5 mr-1" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
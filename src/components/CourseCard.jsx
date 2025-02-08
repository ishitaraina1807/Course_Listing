import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={course.thumbnail} 
        alt={course.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
        <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-sm ${
            course.enrollmentStatus === 'Open' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {course.enrollmentStatus}
          </span>
          <Link 
            to={`/course/${course.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard
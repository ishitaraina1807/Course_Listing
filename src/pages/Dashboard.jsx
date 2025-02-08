import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrollments, markAsCompleted } from '../store/slices/enrollmentsSlice';
import { CheckCircle, Circle } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const enrollments = useSelector(state => state.enrollments.items);
  const courses = useSelector(state => state.courses.items);

  useEffect(() => {
    dispatch(fetchEnrollments(user.id));
  }, [dispatch, user.id]);

  const getEnrolledCourse = (courseId) => {
    return courses.find(course => course.id === courseId);
  };

  const handleMarkCompleted = (enrollmentId) => {
    dispatch(markAsCompleted(enrollmentId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map(enrollment => {
          const course = getEnrolledCourse(enrollment.courseId);
          if (!course) return null;

          return (
            <div key={enrollment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </span>
                  {enrollment.completed ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Completed
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMarkCompleted(enrollment.id)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Circle className="w-5 h-5 mr-1" />
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

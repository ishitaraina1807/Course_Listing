import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../store/slices/coursesSlice";
import { enrollInCourse } from "../store/slices/enrollmentsSlice";
import { ChevronDown, ChevronUp, Clock, MapPin, BookOpen } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.selectedCourse);
  const user = useSelector((state) => state.user.currentUser);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  const handleEnroll = async () => {
    try {
      await dispatch(enrollInCourse({ userId: user.id, courseId: course.id }));
      setIsEnrolled(true);
      alert("Enrolled in the course successfully!");
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  if (!course) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={course.thumbnail} alt={course.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              {course.duration}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {course.location}
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-5 h-5 mr-2" />
              {course.schedule}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
            <ul className="list-disc list-inside text-gray-600">
              {course.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Syllabus</h2>
            {course.syllabus.map((week) => (
              <div key={week.week} className="border-b last:border-b-0">
                <button
                  className="w-full py-4 px-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                >
                  <span className="font-medium">Week {week.week}: {week.topic}</span>
                  {expandedWeek === week.week ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedWeek === week.week && (
                  <div className="px-4 py-3 bg-gray-50">
                    <p className="text-gray-600">{week.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {course.enrollmentStatus === "Open" && (
            <button
              onClick={handleEnroll}
              disabled={isEnrolled}
              className={`w-full py-3 px-6 rounded-lg transition-colors ${
                isEnrolled
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isEnrolled ? "Enrolled" : "Enroll Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

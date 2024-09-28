// FacultyDashboard.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const FacultyDashboard = () => {
  const [courses, setCourses] = useState([]);

  // Fetch faculty courses and students
  useEffect(() => {
    axiosInstance.get('/faculty/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching faculty courses:', error);
      });
  }, []);

  return (
    <div className="faculty-dashboard">
      <h1>Faculty Dashboard</h1>

      <h2>Your Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <h4>Enrolled Students:</h4>
              <ul>
                {course.students.map((student) => (
                  <li key={student.id}>
                    {student.name} - {student.email}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not currently teaching any courses.</p>
      )}
    </div>
  );
};

export default FacultyDashboard;

// AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axiosInstance from '../axiosConfig';

const AdminDashboard = () => {
  const [enrollmentData, setEnrollmentData] = useState({});
  const [facultyLoadData, setFacultyLoadData] = useState({});
  const [departmentDistribution, setDepartmentDistribution] = useState({});

  useEffect(() => {
    // Fetch enrollment trends data
    axiosInstance.get('/admin/enrollment-trends')
      .then(response => {
        const data = response.data;
        setEnrollmentData({
          labels: data.years,  // X-axis data
          datasets: [
            {
              label: 'Student Enrollment',
              data: data.enrollmentNumbers,  // Y-axis data
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching enrollment trends:', error));

    // Fetch faculty workload data
    axiosInstance.get('/admin/faculty-workload')
      .then(response => {
        const data = response.data;
        setFacultyLoadData({
          labels: data.facultyNames,
          datasets: [
            {
              label: 'Number of Courses Taught',
              data: data.courseCounts,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching faculty workload data:', error));

    // Fetch department-wise student distribution
    axiosInstance.get('/admin/department-distribution')
      .then(response => {
        const data = response.data;
        setDepartmentDistribution({
          labels: data.departments,
          datasets: [
            {
              label: 'Students per Department',
              data: data.studentCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
              ],
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching department distribution:', error));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="chart-section">
        <h2>Student Enrollment Trends</h2>
        <Bar
          data={enrollmentData}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>

      <div className="chart-section">
        <h2>Faculty Workload</h2>
        <Bar
          data={facultyLoadData}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>

      <div className="chart-section">
        <h2>Department-wise Student Distribution</h2>
        <Pie data={departmentDistribution} />
      </div>
    </div>
  );
};

export default AdminDashboard;

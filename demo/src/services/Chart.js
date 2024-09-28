import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../axiosConfig";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axiosInstance.get("/admin/dashboard")
      .then(response => {
        const data = response.data;
        setChartData({
          labels: data.labels,  // For example, years or departments
          datasets: [
            {
              label: "Enrollment Trends",
              data: data.enrollmentData,
              backgroundColor: "rgba(75, 192, 192, 0.6)"
            }
          ]
        });
      })
      .catch(error => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;

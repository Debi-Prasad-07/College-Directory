import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/student/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h2>Welcome, {profile.name}</h2>
          <img src={profile.photo} alt="Profile" />
          <p>Email: {profile.email}</p>
          <p>Year: {profile.year}</p>
          <p>Department: {profile.department.name}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default StudentDashboard;

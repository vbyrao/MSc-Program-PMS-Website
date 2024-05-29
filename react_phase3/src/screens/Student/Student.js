import { HashRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import StudentNavBar from "./StudentNavBar";
import StudentHome from "./StudentHome";
import StudentCourses from "./StudentCourses";
import StudentInfo from "./StudentInfo";
import StudentTests from "./StudentTests";
import StudentNotifications from "./StudentNotifications";
import StudentChat from "./StudentChat";
import axios from "../../api/axios";

function Student() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    async function fetchProfileData() {
      const userEmail = localStorage.getItem("userEmail");

      const formData = new URLSearchParams();
      formData.append("email", userEmail);

      try {
        const response = await axios.post("/getUserInfo.php", formData);
        if (response.data.success) {
          setProfileData(response.data.data);
        } else {
          // Handle error (e.g., show a message to the user)
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
  };

  const location = useLocation();

  let ComponentToRender;

  switch (location.pathname) {
    case "/student/":
      ComponentToRender = () => (
        <StudentHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case "/student/courses":
      ComponentToRender = () => <StudentCourses />;
      break;

    case "/student/tests":
      ComponentToRender = () => <StudentTests />;
      break;

    case "/student/notifications":
      ComponentToRender = () => <StudentNotifications />;
      break;
    case "/student/chat":
      ComponentToRender = () => <StudentChat />;
      break;
    default:
      ComponentToRender = () => (
        <StudentHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
  }

  return (
    <>
      <main className="container">
        <StudentNavBar />
        <div className="flex">
          <StudentInfo profileData={profileData} />
          {ComponentToRender && ComponentToRender()}
        </div>
      </main>
    </>
  );
}

export default Student;

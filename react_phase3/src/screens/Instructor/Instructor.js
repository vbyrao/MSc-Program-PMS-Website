import { HashRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import InstructorNavBar from "./InstructorNavBar";
import InstructorInfo from "./InstructorInfo";
import InstructorHome from "./InstructorHome";
import InstructorCourses from "./InstructorCourses";
import InstructorStudent from "./InstructorStudents";
import InstructorTests from "./InstructorTests";
import InstructorNotifications from "./InstructorNotifications";
import InstructorChat from "./InstructorChat";
import axios from "../../api/axios";

function Instructor() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Instructor",
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
    case "/instructor/":
      ComponentToRender = () => (
        <InstructorHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case "/instructor/courses":
      ComponentToRender = () => <InstructorCourses />;
      break;

    case "/instructor/students":
      ComponentToRender = () => <InstructorStudent />;
      break;

    case "/instructor/tests":
      ComponentToRender = () => <InstructorTests />;
      break;
    case "/instructor/notifications":
      ComponentToRender = () => <InstructorNotifications />;
      break;
    case "/instructor/chat":
      ComponentToRender = () => <InstructorChat />;
      break;
    default:
      ComponentToRender = () => (
        <InstructorHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
  }

  return (
    <>
      <main className="container">
        <InstructorNavBar />
        <div className="flex">
          <InstructorInfo profileData={profileData} />
          {ComponentToRender && ComponentToRender()}
        </div>
      </main>
    </>
  );
}

export default Instructor;

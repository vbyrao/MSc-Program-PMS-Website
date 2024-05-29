import { HashRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import AdminInfo from "./AdminInfo";
import AdminHome from "./AdminHome";
import AdminUsers from "./AdminUsers";
import AdminNotifications from "./AdminNotifications";
import AdminChat from "./AdminChat";
import axios from "../../api/axios";
import AddUser from "./AddUser";

function Admin() {
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
    case "/admin/":
      ComponentToRender = () => (
        <AdminHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case "/admin/users":
      ComponentToRender = () => <AdminUsers />;
      break;

    case "/admin/notifications":
      ComponentToRender = () => <AdminNotifications />;
      break;

    case "/admin/adduser":
      ComponentToRender = () => <AddUser />;
      break;
    // case "/admin/notifications":
    //   ComponentToRender = () => <StudentNotifications />;
    //   break;
    case "/admin/chat":
      ComponentToRender = () => <AdminChat />;
      break;
    default:
      ComponentToRender = () => (
        <AdminHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
  }

  return (
    <>
      <main className="container">
        <AdminNavBar />
        <div className="flex">
          <AdminInfo profileData={profileData} />
          {ComponentToRender && ComponentToRender()}
        </div>
      </main>
    </>
  );
}

export default Admin;

import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProgramCoordinatorNavBar from "./ProgramCoordinatorNavBar";
import ProgramCoordinatorHome from "./ProgramCoordinatorHome";
import ProgramCoordinatorInfo from "./ProgramCoordinatorInfo";
import ProgramCoordinatorStudents from "./ProgramCoordinatorStudents";
import ProgramCoordinatorChat from "./ProgramCoordinatorChat";
import ProgramCoordinatorNotifcations from "./ProgramCoordinatorNotifcations";
import axios from "../../api/axios";

function ProgramCoordinator() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Coordinator",
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
    case "/coordinator/":
      ComponentToRender = () => (
        <ProgramCoordinatorHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case "/coordinator/students":
      ComponentToRender = () => <ProgramCoordinatorStudents />;
      break;
    case "/coordinator/notifications":
      ComponentToRender = () => <ProgramCoordinatorNotifcations />;
      break;
    case "/coordinator/chat":
      ComponentToRender = () => <ProgramCoordinatorChat />;
      break;
    default:
      ComponentToRender = () => (
        <ProgramCoordinatorHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
  }

  return (
    <>
      <main className="container">
        <ProgramCoordinatorNavBar />
        <div className="flex">
          <ProgramCoordinatorInfo profileData={profileData} />
          {ComponentToRender && ComponentToRender()}
        </div>
      </main>
    </>
  );
}

export default ProgramCoordinator;

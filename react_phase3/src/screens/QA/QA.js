import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import QANavBar from "./QANavBar";
import QAInfo from "./QAInfo";
import QAHome from "./QAHome";
import QAPolicies from "./QAPolicies";
import QARecommendations from "./QARecommendations";
import QAReports from "./QAReports";
import QANotifications from "./QANotifications";
import QAChat from "./QAChat";
import axios from "../../api/axios";
import QAAddPolicy from "./QAAddPolicy";

function QA() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Quality  Assurance",
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
          console.log(response.data);
          profileData.role = "Quality Assurance";
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
    case "/qa/":
      ComponentToRender = () => (
        <QAHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case "/qa/policies":
      ComponentToRender = () => <QAPolicies />;
      break;
    case "/qa/recommendations":
      ComponentToRender = () => <QARecommendations />;
      break;
    case "/qa/reports":
      ComponentToRender = () => <QAReports />;
      break;
    case "/qa/notifications":
      ComponentToRender = () => <QANotifications />;
      break;
    case "/qa/chat":
      ComponentToRender = () => <QAChat />;
      break;
    case "/qa/QAAddPolicy":
      ComponentToRender = () => <QAAddPolicy />;
      break;
    default:
      ComponentToRender = () => (
        <QAHome
          profileData={profileData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      );
  }

  return (
    <>
      <main className="container">
        <QANavBar />
        <div className="flex">
          <QAInfo profileData={profileData} />
          {ComponentToRender && ComponentToRender()}
        </div>
      </main>
    </>
  );
}

export default QA;

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function QAHome({ profileData, handleInputChange, handleSubmit }) {
  const [phoneWarning, setPhoneWarning] = useState("");
  const storedEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (profileData.phone.replace(/-/g, "").length > 10) {
      setPhoneWarning("You've exceeded the allowed phone number length!");
    } else {
      setPhoneWarning("");
    }
  }, [profileData.phone]);

  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("email", storedEmail);
    formData.append("name", profileData.name);
    formData.append("phone", profileData.phone);

    try {
      const response = await axios.post("/updateStudentProfile.php", formData);

      if (response.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <h1>Edit Profile</h1>
        <form id="edit-profile-form" onSubmit={updateProfile}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              disabled
              value={storedEmail}
              readOnly // This makes the input field uneditable
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // USA phone number format (XXX-XXX-XXXX)
              required
            />
            <small>Format: XXX-XXX-XXXX</small>
            {phoneWarning && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {phoneWarning}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              disabled
              value={"Quality Assurance"}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default QAHome;

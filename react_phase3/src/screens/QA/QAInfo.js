import React from "react";
import Avatar from "../../assets/images/icons/avatar.jpeg";
function QAInfo({ profileData }) {
  console.log(profileData.role);
  return (
    <>
      <div className="sidebar flex-1 text-left">
        <div className="avatar">
          <img src={Avatar} alt="Profile Avatar" />
        </div>
        <div className="profile-info">
          <h2>{profileData.name}</h2>
          <p>Email: {profileData.email}</p>

          <p>Role: {"Quality Assurance"}</p>
        </div>
      </div>
    </>
  );
}

export default QAInfo;

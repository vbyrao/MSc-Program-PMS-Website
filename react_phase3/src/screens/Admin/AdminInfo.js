import React from "react";
import AvatarImage from "../../assets/images/icons/avatar.jpeg";

function AdminInfo({ profileData }) {
  return (
    <div className="sidebar flex-1 text-left">
      <div className="avatar">
        <img src={profileData.avatar || AvatarImage} alt="Profile Avatar" />
      </div>
      <div className="profile-info">
        <h2>{profileData.name}</h2>
        <p>Email: {profileData.email}</p>
        <p>Role: {profileData.role}</p>
      </div>
    </div>
  );
}

export default AdminInfo;

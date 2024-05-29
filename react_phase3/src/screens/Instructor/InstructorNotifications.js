import React from "react";

function InstructorNotifications() {
  const notifications = [
    {
      title: "New Message",
      message: "You have a new message from Lewis Hoit.",
      timestamp: "2 minutes ago",
    },
    {
      title: "Event Reminder",
      message: "Reminder: Meeting at 3:00 PM today.",
      timestamp: "1 hour ago",
    },
    {
      title: "Friend Request",
      message: "You have a new friend request from Jane Smith.",
      timestamp: "1 day ago",
    },
  ];

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <h1>Notifications</h1>
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li key={index}>
              <div className="notification">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="timestamp">{notification.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InstructorNotifications;

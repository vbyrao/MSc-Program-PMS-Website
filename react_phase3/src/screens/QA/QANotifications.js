import React from "react";

function QANotifications() {
  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <h1>Notifications</h1>
        <ul className="notification-list">
          <li>
            <div className="notification">
              <h3>New Message</h3>
              <p>You have a new message from Lewis Hoit.</p>
              <span className="timestamp">2 minutes ago</span>
            </div>
          </li>
          <li>
            <div className="notification">
              <h3>Event Reminder</h3>
              <p>Reminder: Meeting at 3:00 PM today.</p>
              <span className="timestamp">1 hour ago</span>
            </div>
          </li>
          <li>
            <div className="notification">
              <h3>Friend Request</h3>
              <p>You have a new friend request from Jane Smith.</p>
              <span className="timestamp">1 day ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QANotifications;

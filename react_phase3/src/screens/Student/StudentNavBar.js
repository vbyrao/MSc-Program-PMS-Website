import React from "react";
import { NavLink } from "react-router-dom";

function StudentNavBar() {
  return (
    <>
      <nav className="nav-tabs mb-2">
        <ul>
          <li>
            <NavLink to="/student/" activeClassName="active" exact>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/courses" activeClassName="active">
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/tests" activeClassName="active">
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/notifications" activeClassName="active">
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/chat" activeClassName="active">
              Chat
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default StudentNavBar;

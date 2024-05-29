import React from "react";
import { NavLink } from "react-router-dom";

function InstructorNavBar() {
  return (
    <nav className="nav-tabs mb-2">
      <ul>
        <li>
          <NavLink to="/instructor/" activeClassName="active" exact>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor/courses" activeClassName="active">
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor/students" activeClassName="active">
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor/tests" activeClassName="active">
            Tests
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor/notifications" activeClassName="active">
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor/chat" activeClassName="active">
            Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default InstructorNavBar;

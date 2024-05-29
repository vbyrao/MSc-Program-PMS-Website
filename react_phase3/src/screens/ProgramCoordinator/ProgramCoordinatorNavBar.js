import React from "react";
import { NavLink } from "react-router-dom";

function ProgramCoordinatorNavBar() {
  return (
    <nav className="nav-tabs mb-2">
      <ul>
        <li>
          <NavLink to="/coordinator/" activeClassName="active" exact>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/coordinator/students" activeClassName="active">
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/coordinator/notifications" activeClassName="active">
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/coordinator/chat" activeClassName="active">
            Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProgramCoordinatorNavBar;

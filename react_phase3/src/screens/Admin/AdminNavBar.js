import React from "react";
import { NavLink } from "react-router-dom";

function CustomNavBar() {
  return (
    <nav className="nav-tabs mb-2">
      <ul>
        <li>
          <NavLink to="/admin/" activeClassName="active" exact>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/notifications" activeClassName="active">
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/chat" activeClassName="active">
            Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default CustomNavBar;

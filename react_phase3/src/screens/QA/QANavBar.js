import React from "react";
import { NavLink } from "react-router-dom";

function QANavBar() {
  return (
    <nav className="nav-tabs mb-2">
      <ul>
        <li>
          <NavLink to="/qa/" activeClassName="active" exact>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/qa/policies" activeClassName="active">
            Policies
          </NavLink>
        </li>
        <li>
          <NavLink to="/qa/recommendations" activeClassName="active">
            Recommendations
          </NavLink>
        </li>

        <li>
          <NavLink to="/qa/notifications" activeClassName="active">
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/qa/chat" activeClassName="active">
            Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default QANavBar;

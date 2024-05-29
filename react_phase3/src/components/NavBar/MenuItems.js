import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MenuItems() {
  const [isNavbarActive, setNavbarActive] = useState(false);
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  console.log(role);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setNavbarActive(!isNavbarActive);
  };

  useEffect(() => {
    // Check the route permission initially
    checkRoutePermission();

    // Add event listener to listen for hash changes
    window.addEventListener("hashchange", checkRoutePermission);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", checkRoutePermission);
    };
  }, [role]);

  const checkRoutePermission = () => {
    const currentPath = window.location.hash.substring(1);

    console.log(currentPath);

    if (currentPath.includes("/student") && role !== "Student") {
      logout();
    }

    if (currentPath.includes("/instructor") && role !== "Instructor") {
      logout();
    }

    if (currentPath.includes("/admin") && role !== "Admin") {
      logout();
    }

    if (currentPath.includes("/qa") && role !== "QualityAssurance") {
      logout();
    }

    if (currentPath.includes("/coordinator") && role !== "ProgramCoordinator") {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/Login");
  };

  return (
    <div>
      <div className="navbar-toggle" id="navbar-toggle" onClick={toggleNavbar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul
        className={`navbar-list ${isNavbarActive ? "active" : ""}`}
        id="navbar-list"
      >
        <li>
          <NavLink className="menu-link" activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-link" activeClassName="active" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className="menu-link"
            activeClassName="active"
            to="/services"
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink className="menu-link" activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </li>

        {role === "Student" && (
          <li>
            <NavLink
              className="menu-link"
              activeClassName="active"
              to="/student"
            >
              Student
            </NavLink>
          </li>
        )}

        {role === "Instructor" && (
          <li>
            <NavLink
              className="menu-link"
              activeClassName="active"
              to="/instructor/"
            >
              Instructor
            </NavLink>
          </li>
        )}

        {role === "Admin" && (
          <li>
            <NavLink className="menu-link" activeClassName="active" to="/admin">
              Admin
            </NavLink>
          </li>
        )}

        {role === "QualityAssurance" && (
          <li>
            <NavLink className="menu-link" activeClassName="active" to="/qa">
              QA
            </NavLink>
          </li>
        )}

        {role === "ProgramCoordinator" && (
          <li>
            <NavLink
              className="menu-link"
              activeClassName="active"
              to="/coordinator"
            >
              Program Coordinator
            </NavLink>
          </li>
        )}

        <li>
          <a
            className="menu-link"
            href="https://www.uxk4938.uta.cloud/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>

        {!email && (
          <li>
            <NavLink
              className="menu-link login-button"
              activeClassName="active"
              to="/login"
            >
              LOGIN
            </NavLink>
          </li>
        )}

        {email && (
          <li>
            <button className="menu-link logout-button" onClick={logout}>
              LOGOUT
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MenuItems;

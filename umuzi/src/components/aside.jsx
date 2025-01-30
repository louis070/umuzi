import React, { useState } from "react";
import "./aside.css";
import { BrowserRouter, NavLink } from "react-router-dom";
import ShinyText from "./ShinyText";

function Aside() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changesize = () => setIsMinimized(!isMinimized);

  return (
    <div
      className={`sidebar ${isDarkMode ? "dark" : "light"} ${
        isMinimized ? "minimized" : ""
      }`}
    >
      <header>
        <span className="u-logo">U{!isMinimized && <span>muzi</span>}</span>
        <hr className="separator" />
      </header>

      <h4 className="title">General</h4>

      <div className="menu-items">
        <NavLink
          to="/Home"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <div className="icon">
            <img src="../../public/imgs/home.png" className="icon" />
          </div>
          <label>Home</label>
        </NavLink>
        <NavLink
          to="/Sessions"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <div className="icon">
            <img src="../../public/imgs/sessions.png" className="icon" />
          </div>
          <label>Sessions</label>
        </NavLink>
        <NavLink
          to="/Doctors"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <div className="icon">
            <img src="../../public/imgs/doctors.png" className="icon" />
          </div>
          <label>Doctors</label>
        </NavLink>
        <NavLink
          to="/Notifications"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <div className="icon">
            <img src="../../public/imgs/notifications.png" className="icon" />
          </div>
          <label>Notifications</label>
        </NavLink>
        <NavLink
          to="/Management"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <div className="icon">
            <img src="../../public/imgs/management.png" className="icon" />
          </div>
          <label>Management</label>
        </NavLink>
        <NavLink
          to="/Profile"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <div className="icon">
            <img src="../../public/imgs/profile.png" className="icon" />
          </div>
          <label>Profile</label>
        </NavLink>
      </div>
      <br />
      <hr className="separator1" />
      <h4 className="title1">Customization</h4>

      <footer>
        <button>
          <label className="logout">logout</label>
          <img src="../../public/imgs/logout.png" className="icon" />
        </button>
      </footer>
    </div>
  );
}

export default Aside;

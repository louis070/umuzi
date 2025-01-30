import React, { useState } from "react";
import "./Sidemenu.css";

const Sidemenu = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSize = () => setIsMinimized(!isMinimized);

  const menus = [
    { icon: "🏠", label: "Home Page" },
    { icon: "🧾", label: "Scheduled Sessions", total: 224 },
    { icon: "📑", label: "Session Requests", new: 9 },
    { icon: "🧑‍⚕️", label: "Doctors" },
    { icon: "✉️", label: "Notifications", Notification: 12 },
    { icon: "🧔", label: "Profile" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <div
      className={`sidemenu ${isDarkMode ? "dark" : "light"} ${
        isMinimized ? "minimized" : "expanded"
      } `}
    >
      <div className="logo2">
        {isMinimized &&<img src="imgs/side.png" className="logo" />}
        {!isMinimized && <img src="imgs/umuzi.com (1).png" className="logo1"/>}
      </div>

      <hr />

      <div className="menu">
        {menus.slice(0).map((item, index) => (
          <div key={index} className="menu-item">
            <span className="icon">{item.icon}</span>
            {!isMinimized && (
              <span className="label">
                {item.label}
                {item.total && (
                  <span className="total-sessions">{item.total}</span>
                )}
                {item.Notification && (
                  <span className="new-notificaions">{item.Notification}</span>
                )}
                {item.new && (
                  <span className="new-notificaions">{item.new}</span>
                )}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="toggles">
        <button onClick={toggleTheme} className="">
          {!isDarkMode ? <p>🌙</p> : <p>☀️</p>}
          {!isDarkMode && !isMinimized && <p>Go to dark mode</p>}
          {isDarkMode && !isMinimized && <p>Go to light mode</p>}
        </button>
        <button onClick={toggleSize}>✖️</button>
      </div>
    </div>
  );
};
export default Sidemenu;

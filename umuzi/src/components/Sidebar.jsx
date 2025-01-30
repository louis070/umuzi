import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMinimized = () => setIsMinimized(!isMinimized);

  const menuItems = [
    { icon: "🏠", label: "Home Page" },
    { icon: "🧾", label: "Scheduled Sessions", total: 224 },
    { icon: "📑", label: "Session Requests", new: 9 },
    { icon: "🧑‍⚕️", label: "Doctors" },
    { icon: "✉️", label: "Notifications", Notification: 12 },
    { icon: "🧔", label: "Profile" },
    { icon: "⚙️", label: "Settings" }
  ];

  return (
    <div
      className={`sidebar ${isDarkMode ? "dark" : "light"} ${
        isMinimized ? "minimized" : ""
      }`}
    >
      <div className="header">
        <img src="/imgs/side.png" className="logo" />
        {!isMinimized && <h1>muzi</h1>}
        {!isMinimized && <button onClick={toggleMinimized}> x </button>}
      </div>
      {isMinimized && <button onClick={toggleMinimized}> {">>"} </button>}
      <hr />
      <div className="menu">
        <div className="menu-section">
          {menuItems.slice(0).map((item, index) => (
            <div key={index} className="menu-item">
                <span className="icon">{item.icon}</span>
                {!isMinimized && (
                  <span className="label">
                    {item.label}
                    {item.total && (
                      <span className="new" title="Total">
                        {item.total}
                      </span>
                    )}
                    {item.Notification && (
                      <span className="notification">{item.Notification}</span>
                    )}
                    {item.new && <span className="new">{item.new}</span>}
                  </span>
                )}
            </div>
          ))}
        </div>
        <div className="footer">
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;

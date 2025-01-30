import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Doctors from "./components/doctors"
import Management from "./components/management";
import Profile from "./components/profile";
import Home from "./components/home";
import Notifications from "./components/notifications";
import Sessions from "./components/sessions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Sessions" element={<Sessions />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Management" element={<Management />} />
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <p></p>
    </Router>
  );
}

export default App;

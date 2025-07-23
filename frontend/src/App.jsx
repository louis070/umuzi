import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageDoctors from "./pages/ManageDoctors";
import ManageAppointments from "./pages/ManageAppointments";
import Notifications from "./pages/Notifications";
import MedicineReminders from "./pages/MedicineReminders";
import Profile from "./pages/Profile";
import SessionBookingForm from "./components/SessionBookingForm";
import Index from "./components";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const hideSidebar = ["/", "/login", "/register"].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/patients/logout");
      localStorage.removeItem("token"); // Remove JWT
      navigate("/"); // Redirect to home page
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fa" }}>
      {!hideSidebar && (
        <nav
          style={{
            width: "220px",
            background: "#27ae60",
            color: "#fff",
            padding: "32px 0",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            boxShadow: "2px 0 8px rgba(39,174,96,0.08)"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "1.3rem", textAlign: "center", marginBottom: "32px", letterSpacing: "-1px" }}>
            Umuzi.com
          </div>
          <Link to="/" style={sidebarLinkStyle}>Home</Link>
          <Link to="/login" style={sidebarLinkStyle}>Login</Link>
          <Link to="/register" style={sidebarLinkStyle}>Register</Link>
          <Link to="/patient" style={sidebarLinkStyle}>Patient Dashboard</Link>
          <Link to="/doctor" style={sidebarLinkStyle}>Doctor Dashboard</Link>
          <Link to="/admin" style={sidebarLinkStyle}>Admin Dashboard</Link>
          <Link to="/manage-doctors" style={sidebarLinkStyle}>Manage Doctors</Link>
          <Link to="/manage-appointments" style={sidebarLinkStyle}>Manage Appointments</Link>
          <Link to="/notifications" style={sidebarLinkStyle}>Notifications</Link>
          <Link to="/medicine-reminders" style={sidebarLinkStyle}>Medicine Reminders</Link>
          <Link to="/profile" style={sidebarLinkStyle}>Profile</Link>
          <Link to="/book-session" style={sidebarLinkStyle}>Book Session</Link>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "auto",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "12px 32px",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </nav>
      )}
      <main style={{ flex: 1, padding: "40px 32px" }}>
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/patient" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctor" element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/manage-doctors" element={
            <ProtectedRoute>
              <ManageDoctors />
            </ProtectedRoute>
          } />
          <Route path="/manage-appointments" element={
            <ProtectedRoute>
              <ManageAppointments />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/medicine-reminders" element={
            <ProtectedRoute>
              <MedicineReminders />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/book-session" element={<SessionBookingForm />} />
          <Route path="/index" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

const sidebarLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "12px 32px",
  fontSize: "1rem",
  fontWeight: 500,
  marginBottom: "6px",
  borderRadius: "6px",
  transition: "background 0.18s",
  display: "block"
};

export default App;
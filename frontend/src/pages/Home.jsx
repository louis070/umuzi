import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div
    style={{
      maxWidth: "480px",
      margin: "80px auto",
      padding: "40px 32px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(39,174,96,0.10)",
      textAlign: "center",
    }}
  >
    <h1
      style={{
        color: "#27ae60",
        fontWeight: 700,
        fontSize: "2.2rem",
        marginBottom: "18px",
        letterSpacing: "-1px",
      }}
    >
      Welcome to Umuzi.com
    </h1>
    <p
      style={{
        fontSize: "1.1rem",
        color: "#333",
        marginBottom: "32px",
      }}
    >
      Book hospital sessions, manage your appointments, and get reminders for
      your health needs.
    </p>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <Link to="/login" style={homeBtnStyle}>
        Sign In
      </Link>
      <Link to="/register" style={homeBtnStyle}>
        Sign Up
      </Link>
      <Link to="/book-session" style={homeBtnStyle}>
        Book Session
      </Link>
      <Link to="/register-hospital" style={homeBtnStyle}>
        Register a Hospital
      </Link>
    </div>
  </div>
);

const homeBtnStyle = {
  background: "#27ae60",
  color: "#fff",
  padding: "14px 0",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "1.08rem",
  textDecoration: "none",
  boxShadow: "0 2px 8px rgba(39,174,96,0.08)",
  transition: "background 0.18s",
};

export default Home;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [mode, setMode] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isHospitalAdmin, setIsHospitalAdmin] = useState(false);
  const [hospital, setHospital] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = mode === "email"
        ? { email: identifier, password }
        : { phone_number: identifier, password };
      const res = await axios.post("http://localhost:5000/api/patients/login", payload);
      localStorage.setItem("token", res.data.token); // Store JWT
      navigate("/index"); // Redirect to main page after login
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleHospitalChange = e =>
    setHospital({ ...hospital, [e.target.name]: e.target.value });

  const handleHospitalSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/hospitals/send-login-link", hospital);
      alert("A login link has been sent to your email.");
    } catch (err) {
      alert("Failed to send login link.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
      <label>
        <input
          type="checkbox"
          checked={isHospitalAdmin}
          onChange={() => setIsHospitalAdmin(v => !v)}
        />
        Login as a hospital admin
      </label>
      {isHospitalAdmin ? (
        <form onSubmit={handleHospitalSubmit}>
          <input
            name="name"
            placeholder="Hospital Name"
            value={hospital.name}
            onChange={handleHospitalChange}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <input
            name="email"
            type="email"
            placeholder="Hospital Email"
            value={hospital.email}
            onChange={handleHospitalChange}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <button type="submit" style={{ width: "100%", padding: 10 }}>
            Send Login Link
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
          <div style={{ marginBottom: 8 }}>
            <button type="button" onClick={() => setMode("email")} disabled={mode === "email"}>Email</button>
            <button type="button" onClick={() => setMode("phone")} disabled={mode === "phone"}>Phone Number</button>
          </div>
          {mode === "email" ? (
            <input
              type="email"
              placeholder="Email"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
              style={{ width: "100%", marginBottom: 12, padding: 8 }}
            />
          ) : (
            <input
              type="text"
              placeholder="Phone Number (+2507XXXXXXXX)"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
              style={{ width: "100%", marginBottom: 12, padding: 8 }}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <button type="submit" style={{ width: "100%", padding: 10 }}>Login</button>
        </form>
      )}
    </div>
  );
}
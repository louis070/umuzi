import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [mode, setMode] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
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
  );
}
import React, { useState } from "react";
import axios from "axios";

export default function RegisterHospital() {
  const [form, setForm] = useState({
    name: "",
    province: "",
    district: "",
    sector: "",
    email: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/hospitals/register", form);
      alert("Hospital registered!");
      setForm({ name: "", province: "", district: "", sector: "", email: "" });
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Register Hospital</h2>
      <input name="name" placeholder="Hospital Name" value={form.name} onChange={handleChange} required />
      <input name="province" placeholder="Province" value={form.province} onChange={handleChange} required />
      <input name="district" placeholder="District" value={form.district} onChange={handleChange} required />
      <input name="sector" placeholder="Sector" value={form.sector} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
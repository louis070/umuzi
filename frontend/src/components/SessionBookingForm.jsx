import React, { useState } from "react";
import "../styles/sessionBookingForm.css";

const SessionBookingForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    district: "",
    sector: "",
    phone: "",
    email: "",
    nationalId: "",
    province: "",
    hospital: "",
    specialty: "",
    illnessDescription: "",
  });

  // Dummy data for dropdowns
  const provinces = ["Province 1", "Province 2", "Province 3"];
  const districts = ["District A", "District B"];
  const hospitals = ["Hospital X", "Hospital Y"];
  const specialties = ["Cardiology", "Pediatrics", "General", "I don't know"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert("Session booked!");
  };

  return (
    <div className="session-booking-form">
      <h2>Book a Hospital Session</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={form.address} onChange={handleChange} required />
        </label>
        <label>
          District:
          <select name="district" value={form.district} onChange={handleChange} required>
            <option value="">Select District</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label>
          Sector:
          <input type="text" name="sector" value={form.sector} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Email (optional):
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          National ID Number:
          <input type="text" name="nationalId" value={form.nationalId} onChange={handleChange} required />
        </label>
        <label>
          Province:
          <select name="province" value={form.province} onChange={handleChange} required>
            <option value="">Select Province</option>
            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label>
          Hospital:
          <select name="hospital" value={form.hospital} onChange={handleChange} required>
            <option value="">Select Hospital</option>
            {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </label>
        <label>
          Specialty:
          <select name="specialty" value={form.specialty} onChange={handleChange} required>
            <option value="">Select Specialty</option>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {form.specialty === "I don't know" && (
          <label>
            Describe your illness:
            <textarea name="illnessDescription" value={form.illnessDescription} onChange={handleChange} required />
          </label>
        )}
        <button type="submit">Book Session</button>
      </form>
    </div>
  );
};

export default SessionBookingForm;
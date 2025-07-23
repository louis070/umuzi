import React, { useState } from "react";
import axios from "axios";

const passwordRequirements = [
  { regex: /.{8,}/, label: "At least 8 characters" },
  { regex: /[A-Z]/, label: "An uppercase letter" },
  { regex: /[a-z]/, label: "A lowercase letter" },
  { regex: /[0-9]/, label: "A number" },
  { regex: /[^A-Za-z0-9]/, label: "A symbol" }
];

function validatePassword(password) {
  return passwordRequirements.filter(req => !req.regex.test(password)).map(req => req.label);
}

export default function SignupForm() {
  const [form, setForm] = useState({
    p_firstname: "",
    p_lastname: "",
    DOB: "",
    phone_number: "",
    email: "",
    national_ID_N: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [missing, setMissing] = useState(passwordRequirements.map(r => r.label));

  React.useEffect(() => {
    setMissing(validatePassword(form.password));
  }, [form.password]);

  const validate = () => {
    const errs = {};
    if (!/^7[8923]\d{7}$/.test(form.phone_number)) {
      errs.phone_number = "Phone must start with 78, 79, 72, or 73 and be 9 digits.";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errs.email = "Invalid email address.";
    }
    if (!/^\d{16}$/.test(form.national_ID_N)) {
      errs.national_ID_N = "National ID must be exactly 16 digits.";
    }
    return errs;
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length || missing.length > 0) return;
    try {
      await axios.post("http://localhost:5000/api/patients/register", {
        ...form,
        phone_number: "+250" + form.phone_number
      });
      alert("Signup successful!");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Sign Up</h2>
      <input name="p_firstname" placeholder="First Name" value={form.p_firstname} onChange={handleChange} required />
      <input name="p_lastname" placeholder="Last Name" value={form.p_lastname} onChange={handleChange} required />
      <input name="DOB" type="date" placeholder="Date of Birth" value={form.DOB} onChange={handleChange} required />
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 4 }}>+250</span>
        <input
          name="phone_number"
          placeholder="7XXXXXXXX"
          value={form.phone_number}
          onChange={handleChange}
          maxLength={9}
          required
        />
      </div>
      {errors.phone_number && <div style={{ color: "red" }}>{errors.phone_number}</div>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      <input
        name="national_ID_N"
        placeholder="National ID (16 digits)"
        value={form.national_ID_N}
        onChange={handleChange}
        maxLength={16}
        required
      />
      {errors.national_ID_N && <div style={{ color: "red" }}>{errors.national_ID_N}</div>}
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {missing.length > 0 && (
        <div style={{ color: "red", fontSize: "0.9em", marginBottom: 8 }}>
          Password must have: {missing.join(", ")}
        </div>
      )}
      <button type="submit" disabled={missing.length > 0}>Sign Up</button>
    </form>
  );
}
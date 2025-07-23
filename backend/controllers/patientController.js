const patientModel = require('../models/patientModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

function validatePassword(password) {
  const rules = [
    /.{8,}/,
    /[A-Z]/,
    /[a-z]/,
    /[0-9]/,
    /[^A-Za-z0-9]/
  ];
  return rules.every(r => r.test(password));
}

exports.register = async (req, res) => {
  try {
    const { p_firstname, p_lastname, DOB, phone_number, email, national_ID_N, password } = req.body;

    if (!phone_number.startsWith("+250") || !/^(\+2507[8923]\d{7})$/.test(phone_number)) {
      return res.status(400).json({ error: "Phone must start with +250 and be valid." });
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }
    if (!/^\d{16}$/.test(national_ID_N)) {
      return res.status(400).json({ error: "National ID must be exactly 16 digits." });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password does not meet requirements." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await patientModel.createPatient({
      p_firstname, p_lastname, DOB, phone_number, email, national_ID_N, password: hashedPassword
    });
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    let patient;
    if (req.body.email) {
      patient = await patientModel.findByEmail(req.body.email);
    } else if (req.body.phone_number) {
      patient = await patientModel.findByPhone(req.body.phone_number);
    } else {
      return res.status(400).json({ error: "Email or phone number required." });
    }

    if (!patient) return res.status(401).json({ error: 'Invalid credentials' });

    if (!validatePassword(req.body.password)) {
      return res.status(400).json({ error: "Password does not meet requirements." });
    }

    const match = await bcrypt.compare(req.body.password, patient.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ p_id: patient.p_id, email: patient.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  // For JWT, logout is handled client-side by removing the token.
  res.json({ message: "Logged out successfully" });
};

exports.getProfile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
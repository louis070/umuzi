const hospitalModel = require('../models/hospitalModel');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  try {
    const { name, province, district, sector, email } = req.body;
    await hospitalModel.createHospital({ name, province, district, sector, email });
    res.status(201).json({ message: "Hospital registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sendLoginLink = async (req, res) => {
  const { name, email } = req.body;
  try {
    // Optionally, verify hospital exists:
     const hospital = await hospitalModel.findByNameAndEmail(name, email);
     if (!hospital) return res.status(404).json({ error: "Hospital not found" });

    // Generate a login link (for demo, just a static link)
    const loginLink = `http://localhost:3000/hospital-admin-dashboard?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

    // Configure nodemailer (use your real credentials in production)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_gmail@gmail.com",
        pass: "your_gmail_app_password"
      }
    });

    await transporter.sendMail({
      from: '"Umuzi" <your_gmail@gmail.com>',
      to: email,
      subject: "Hospital Admin Login Link",
      html: `<p>Hello ${name},</p>
             <p>Click <a href="${loginLink}">here</a> to access your Hospital Admin Dashboard.</p>`
    });

    res.json({ message: "Login link sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
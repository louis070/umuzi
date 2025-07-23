const db = require('../db');

exports.createPatient = async (data) => {
  const { p_firstname, p_lastname, DOB, phone_number, email, national_ID_N, password } = data;
  const [result] = await db.execute(
    `INSERT INTO patients (p_firstname, p_lastname, DOB, phone_number, email, national_ID_N, password)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [p_firstname, p_lastname, DOB, phone_number, email, national_ID_N, password]
  );
  return result;
};

exports.findByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT * FROM patients WHERE email = ?`,
    [email]
  );
  return rows[0];
};

exports.findByPhone = async (phone_number) => {
  const [rows] = await db.execute(
    `SELECT * FROM patients WHERE phone_number = ?`,
    [phone_number]
  );
  return rows[0];
};
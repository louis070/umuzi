const db = require('../db');

exports.createHospital = async ({ name, province, district, sector, email }) => {
  const [result] = await db.execute(
    `INSERT INTO hospitals (h_province, h_district, h_sector, h_name, email) VALUES (?, ?, ?, ?, ?)`,
    [province, district, sector, name, email]
  );
  return result;
};

exports.findByNameAndEmail = async (name, email) => {
  const [rows] = await db.execute(
    `SELECT * FROM hospitals WHERE h_name = ? AND email = ?`,
    [name, email]
  );
  return rows[0];
};
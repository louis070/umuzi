const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // change if needed
  password: '', // change if needed
  database: 'umuzi'
});

module.exports = pool;
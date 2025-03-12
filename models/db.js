const mysql = require('mysql2/promise');
const config = require('../config/config');

const pool = mysql.createPool({
  host: config.DB.host,
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
  waitForConnections: true,
  connectionLimit: config.DB.connectionLimit,
  queueLimit: 0
});

module.exports = pool;

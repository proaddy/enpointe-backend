// In db.js
const { Pool } = require('pg');
const { DB } = require('../config/config');

let pool;

console.log(DB);
// Use connection string if available
if (DB.connection_string) {
  console.log("this is not working");
  pool = new Pool({
    connectionString: DB.connection_string,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Fallback to individual parameters
  pool = new Pool({
    host: config.DB.host,
    user: config.DB.user,
    password: config.DB.password,
    database: config.DB.database,
    port: config.DB.port || 5432,
    ssl: {
      rejectUnauthorized: false
    }
  }
);
}

// Test connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = pool;
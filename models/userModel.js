const pool = require('./db');

const userModel = {
  findAllUsers: async () => {
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE role=$1', ['user']);
    return result.rows;
  },

  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
  
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },
  
  createUser: async (userData) => {
    const { name, email, password, role } = userData;
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, password, role || 'user']
    );
    return result.rows[0].id;
  },
  
  updateUser: async (id, userData) => {
    const { name, email } = userData;
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    return result.rowCount > 0;
  }
};

module.exports = userModel;
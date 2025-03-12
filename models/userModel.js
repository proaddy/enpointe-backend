const pool = require('./db');

const userModel = {
  findAllUsers: async () => {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE role="user"');
    return rows;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  
  createUser: async (userData) => {
    const { name, email, password, role } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role || 'user']
    );
    return result.insertId;
  },
  
  updateUser: async (id, userData) => {
    const { name, email } = userData;
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = userModel;


// this is all test data for user model
// const users = [
//     {
//         id: "1",
//         name: "John Doe",
//         email: "user@example.com",
//         password: "password",
//         type: "user",
//     },
//     {
//         id: "2",
//         name: "Jane Smith",
//         email: "user2@example.com",
//         password: "password",
//         type: "user",
//     },
//     {
//         id: "3",
//         name: "Admin User",
//         email: "banker@example.com",
//         password: "password",
//         type: "banker",
//     },
// ];

// exports.findByEmail = (email) => {
//     return users.find((u) => u.email === email);
// };

// exports.findById = (id) => {
//     return users.find((u) => u.id === id);
// };

// exports.findAllUsers = () => {
//     return users
//         .filter((user) => user.type === "user")
//         .map(({ id, name, email, type }) => ({ id, name, email, type }));
// };

const pool = require('./db');

const balanceModel = {
  getUserBalance: async (userId) => {
    const [rows] = await pool.query('SELECT * FROM balances WHERE user_id = ?', [userId]);
    // console.log(rows, rows[0]);
    return rows[0];
  },
  
  updateBalance: async (userId, amount) => {
    // First check if balance exists
    const [existing] = await pool.query('SELECT * FROM balances WHERE user_id = ?', [userId]);
    let newAmount;
    
    if (existing.length === 0) {
      // Create new balance record
      await pool.query(
        'INSERT INTO balances (user_id, amount) VALUES (?, ?)',
        [userId, 0]
      );
    } else {
      let tempAmount = parseFloat(existing[0].amount);
      newAmount = tempAmount += amount;

      // Update existing record
      await pool.query(
        'UPDATE balances SET amount = ? WHERE user_id = ?',
        [newAmount, userId]
      );
    }
    return newAmount;
  }
};

module.exports = balanceModel;

// this is test data for database model
// let userBalances = {
//     1: 1200.0,
//     2: 2500.0,
// };

// exports.getBalance = (userId) => {
//     return userBalances[userId] || 0;
// };

// exports.updateBalance = (userId, amount) => {
//     if (!userBalances[userId]) {
//         userBalances[userId] = 0;
//     }
//     userBalances[userId] += amount;
//     return userBalances[userId];
// };

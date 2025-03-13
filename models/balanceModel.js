const pool = require('./db');

const balanceModel = {
  getUserBalance: async (userId) => {
    const result = await pool.query('SELECT * FROM balances WHERE user_id = $1', [userId]);
    return result.rows[0];
  },
  
  updateBalance: async (userId, amount) => {
    // First check if balance exists
    const existing = await pool.query('SELECT * FROM balances WHERE user_id = $1', [userId]);
    let newAmount;
    
    if (existing.rows.length === 0) {
      // Create new balance record
      await pool.query(
        'INSERT INTO balances (user_id, amount) VALUES ($1, $2)',
        [userId, 0]
      );
      newAmount = parseFloat(amount);
    } else {
      let tempAmount = parseFloat(existing.rows[0].amount);
      newAmount = tempAmount + parseFloat(amount);

      // Update existing record
      await pool.query(
        'UPDATE balances SET amount = $1 WHERE user_id = $2',
        [newAmount, userId]
      );
    }
    return newAmount;
  }
};

module.exports = balanceModel;
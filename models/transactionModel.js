const pool = require('./db');

const transactionModel = {
  createTransaction: async (transactionData) => {
    const { user_id, type, amount, description } = transactionData;

    const result = await pool.query(
      'INSERT INTO transactions (user_id, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING id',
      [user_id, type, amount, description]
    );
    return result.rows[0].id;
  },
  
  getUserTransactions: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  findByUserId: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1', [userId]
    );
    return result.rows;
  }
};

module.exports = transactionModel;
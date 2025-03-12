const pool = require('./db');

const transactionModel = {
  createTransaction: async (transactionData) => {
    const { user_id, type, amount, description } = transactionData;

    const [result] = await pool.query(
      'INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
      [user_id, type, amount, description]
    );
    return result.insertId;
  },
  
  getUserTransactions: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  findByUserId: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ?', [userId]
    );
    return rows;
  }
};

module.exports = transactionModel;


// test transaction model
// const { v4: uuidv4 } = require("uuid");
// let transactions = [
//     {
//         id: "101",
//         userId: "1",
//         date: "2025-03-01",
//         amount: 500.0,
//         type: "deposit",
//         description: "Salary",
//     },
//     {
//         id: "102",
//         userId: "1",
//         date: "2025-03-05",
//         amount: 50.0,
//         type: "withdrawal",
//         description: "ATM Withdrawal",
//     },
//     {
//         id: "103",
//         userId: "2",
//         date: "2025-03-03",
//         amount: 1000.0,
//         type: "deposit",
//         description: "Bonus",
//     },
// ];

// exports.findByUserId = (userId) => {
//     return transactions.filter((t) => t.userId === userId);
// };

// exports.createTransaction = (userId, amount, type, description) => {
//     const transactionId = uuidv4();
//     const newTransaction = {
//         id: transactionId,
//         userId,
//         date: new Date().toISOString(),
//         amount: parseFloat(amount),
//         type,
//         description,
//     };

//     transactions.push(newTransaction);
//     return newTransaction;
// };

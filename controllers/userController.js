const transactionModel = require("../models/transactionModel");
const balanceModel = require("../models/balanceModel");

exports.getUserTransactions = async (req, res) => {
    const userTransactions = await transactionModel.findByUserId(req.user.id);
    res.json({ transactions: userTransactions });
};

exports.getUserBalance = async (req, res) => {
    const userId = req.user.id;
    const balance = await balanceModel.getUserBalance(userId);
    // console.log(balance, "balance");
    res.json({ balance });
};

exports.deposit = async (req, res) => {
    const { amount } = req.body;
    const numAmount = parseFloat(amount);

    // Validate amount
    if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    const userId = req.user.id;
    
    // Update balance
    const newBalance = await balanceModel.updateBalance(userId, numAmount);
    
    // Create new transaction
    const transaction = await transactionModel.createTransaction({
        user_id: userId,
        amount: numAmount,
        type: "deposit",
        description: "Deposit",
    });

    res.json({
        success: true,
        transactionId: transaction.id,
        newBalance,
    });
};

exports.withdraw = async (req, res) => {
    const { amount } = req.body;
    const numAmount = parseFloat(amount);

    // Validate amount
    if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    const userId = req.user.id;
    const currentBalance = await balanceModel.getUserBalance(userId);

    // Check if user has enough balance
    if (currentBalance.amount < numAmount) {
        return res.status(400).json({ message: "Insufficient funds" });
    }

    // Update balance (subtract by passing negative amount)
    const newBalance = await balanceModel.updateBalance(userId, -numAmount);

    // Create new transaction
    const transaction = await transactionModel.createTransaction({
        user_id: userId,
        amount: numAmount,
        type: "withdrawal",
        description: "Withdrawal",
    });

    res.json({
        success: true,
        transactionId: transaction.id,
        newBalance,
    });
};

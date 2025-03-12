const userModel = require("../models/userModel");
const transactionModel = require("../models/transactionModel");

exports.getAllUsers = async (req, res) => {
    const clientUsers = await userModel.findAllUsers();
    res.json({ users: clientUsers });
};

exports.getUserTransactions = async (req, res) => {
    const { userId } = req.params;
    const userTransactions = await transactionModel.findByUserId(userId);

    res.json({ transactions: userTransactions });
};

const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const balanceModel = require("../models/balanceModel");
const tokenUtils = require("../utils/tokenUtils");

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);

    // find user
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = tokenUtils.generateAccessToken(user);
    res.json({ token });
};

exports.loginBanker = async (req, res) => {
    const { email, password } = req.body;

    const banker = await userModel.findByEmail(email);

    if (!banker) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, banker.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = tokenUtils.generateAccessToken(banker);
    res.json({ token });
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findByEmail(email);
    if(existingUser) {
        return res.status(400).json({ message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
        name,
        email,
        password: hashPassword,
        role: 'user'
    });

    balanceModel.updateBalance(user);

    // const token = generateToken(userId, 'user');
    const token = tokenUtils.generateAccessToken(user);
    res.status(201).json({ token });
}

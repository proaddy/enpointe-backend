// utils/tokenUtils.js
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');

exports.generateAccessToken = (user) => {
  // Remove sensitive information
  const userInfo = {
    id: user.id,
    email: user.email,
    type: user.role
  };

  // console.log(userInfo, "tokenutils");
  
  // Generate token with UUID for additional randomness
  const tokenId = uuidv4();
  return jwt.sign({ ...userInfo, tokenId:tokenId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
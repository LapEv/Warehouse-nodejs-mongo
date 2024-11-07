const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (id, roles, username) => {
  const payload = { id, roles, username };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
};

module.exports = generateAccessToken;

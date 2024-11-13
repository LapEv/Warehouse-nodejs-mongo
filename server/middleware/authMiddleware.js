const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ result: 'error', message: 'Пользователь не авторизован!' });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res
      .status(401)
      .json({ result: 'error', message: 'Пользователь не авторизован!' });
  }
};

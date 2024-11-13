const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({
          result: 'error',
          message: 'Пользователь не авторизован!',
          status: 'NotLogged',
        });
      }
      const { roles: userRoles } = jwt.verify(token, process.env.SECRET);
      let hasRole = false;
      userRoles.map((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res
          .status(403)
          .json({ result: 'error', message: 'У вас нет прав!' });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({
        result: 'error',
        message: 'Пользователь не авторизован!',
        status: 'NotLogged',
      });
    }
  };
};

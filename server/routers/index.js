const Router = require('express');
const router = new Router();
const rolesRouter = require('./users/roles');
const positionsRouter = require('./users/positions');
const usersRouter = require('./users/users');

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/positions', positionsRouter);

module.exports = router;

const Router = require('express');
const router = new Router();
const rolesRouter = require('./users/roles');
const positionsRouter = require('./users/positions');
const usersRouter = require('./users/users');
const warehouseRouter = require('./warehouse/warehouse');
const clientsRouter = require('./clients/clients');
const regionsRouter = require('./clients/regions');
const objectsRouter = require('./clients/objects');

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/positions', positionsRouter);
router.use('/warehouse', warehouseRouter);
router.use('/clients', clientsRouter);
router.use('/regions', regionsRouter);
router.use('/objects', objectsRouter);

module.exports = router;

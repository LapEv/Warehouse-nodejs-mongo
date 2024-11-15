const Router = require('express');
const router = new Router();
const rolesRouter = require('./users/roles');
const positionsRouter = require('./users/positions');
const usersRouter = require('./users/users');
const clientsRouter = require('./clients/clients');
const regionsRouter = require('./clients/regions');
const objectsRouter = require('./clients/objects');
const classifierRouter = require('./warehouse/classifier');
const modelsRouter = require('./warehouse/models');
const zipRouter = require('./warehouse/zip');
const podmenaRouter = require('./warehouse/podmena');
const warehouseRouter = require('./warehouse/warehouse');
const filesRouter = require('./fileUtils/fileUtils');

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/positions', positionsRouter);
router.use('/clients', clientsRouter);
router.use('/regions', regionsRouter);
router.use('/objects', objectsRouter);
router.use('/classifier', classifierRouter);
router.use('/models', modelsRouter);
router.use('/zip', zipRouter);
router.use('/podmena', podmenaRouter);
router.use('/warehouse', warehouseRouter);
router.use('/files', filesRouter);

module.exports = router;

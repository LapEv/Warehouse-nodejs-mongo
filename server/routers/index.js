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
const classifierZIPRouter = require('./warehouse/classifierZIP');
const classifierPodmenaRouter = require('./warehouse/classifierPodmena');

router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/positions', positionsRouter);
router.use('/clients', clientsRouter);
router.use('/regions', regionsRouter);
router.use('/objects', objectsRouter);
router.use('/classifier', classifierRouter);
router.use('/models', modelsRouter);
router.use('/classifierZIP', classifierZIPRouter);
router.use('/classifierPodmena', classifierPodmenaRouter);

module.exports = router;

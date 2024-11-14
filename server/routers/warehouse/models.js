const Router = require('express');
const router = new Router();
const models = require('../../controllers/warehouse/models');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getModels',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  models.getModels
);
router.post(
  '/newModel',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  models.newModel
);
router.post(
  '/deleteModel',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  models.deleteModel
);
router.post(
  '/getModelFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  models.getModelFromArchive
);
router.delete(
  '/fullDeleteModel',
  roleMiddleware(['SUPERADMIN']),
  models.fullDeleteModel
);

module.exports = router;

const Router = require('express');
const router = new Router();
const objects = require('../../controllers/clients/objects');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getObjects',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  objects.getObjects
);
router.post(
  '/newObject',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  objects.newObject
);
router.post(
  '/deleteObject',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  objects.deleteObject
);
router.post(
  '/getObjectFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  objects.getObjectFromArchive
);
router.delete(
  '/fullDeleteObject',
  roleMiddleware(['SUPERADMIN']),
  objects.fullDeleteObject
);

module.exports = router;

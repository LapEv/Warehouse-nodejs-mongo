const Router = require('express');
const router = new Router();
const zip = require('../../controllers/warehouse/zip');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getZIP',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  zip.getZIP
);
router.post('/newZIP', roleMiddleware(['ADMIN', 'SUPERADMIN']), zip.newZIP);
router.post(
  '/deleteZIP',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  zip.deleteZIP
);
router.post(
  '/getZIPFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  zip.getZIPFromArchive
);
router.delete(
  '/fullDeleteZIP',
  roleMiddleware(['SUPERADMIN']),
  zip.fullDeleteZIP
);

module.exports = router;

const Router = require('express');
const router = new Router();
const regions = require('../../controllers/clients/regions');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getRegions',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  regions.getRegions
);
router.post(
  '/newRegion',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  regions.newRegion
);
router.post(
  '/deleteRegion',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  regions.deleteRegion
);
router.post(
  '/getRegionFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  regions.getRegionFromArchive
);
router.delete(
  '/fullDeleteRegion',
  roleMiddleware(['SUPERADMIN']),
  regions.fullDeleteRegion
);

module.exports = router;

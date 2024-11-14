const Router = require('express');
const router = new Router();
const podmena = require('../../controllers/warehouse/Podmena');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getPodmena',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  podmena.getPodmena
);
router.post(
  '/newPodmena',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  podmena.newPodmena
);
router.post(
  '/deletePodmena',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  podmena.deletePodmena
);
router.post(
  '/getPodmenaFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  podmena.getPodmenaFromArchive
);
router.delete(
  '/fullDeletePodmena',
  roleMiddleware(['SUPERADMIN']),
  podmena.fullDeletePodmena
);

module.exports = router;

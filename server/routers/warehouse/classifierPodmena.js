const Router = require('express');
const router = new Router();
const classifierPodmena = require('../../controllers/warehouse/classifierPodmena');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getClassifierPodmena',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  classifierPodmena.getClassifierPodmena
);
router.post(
  '/newClassifierPodmena',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifierPodmena.newClassifierPodmena
);
router.post(
  '/deleteClassifierPodmena',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifierPodmena.deleteClassifierPodmena
);
router.post(
  '/getClassifierPodmenaFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifierPodmena.getClassifierPodmenaFromArchive
);
router.delete(
  '/fullDeleteClassifierPodmena',
  roleMiddleware(['SUPERADMIN']),
  classifierPodmena.fullDeleteClassifierPodmena
);

module.exports = router;

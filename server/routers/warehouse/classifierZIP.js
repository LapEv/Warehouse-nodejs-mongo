const Router = require('express');
const router = new Router();
const classifierZIP = require('../../controllers/warehouse/classifierZIP');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getClassifierZIP',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  classifierZIP.getClassifierZIP
);
router.post(
  '/newClassifierZIP',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifierZIP.newClassifierZIP
);
router.post(
  '/deleteClassifierZIP',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifierZIP.deleteClassifierZIP
);
router.post(
  '/getClassifierZIPFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifierZIP.getClassifierZIPFromArchive
);
router.delete(
  '/fullDeleteClassifierZIP',
  roleMiddleware(['SUPERADMIN']),
  classifierZIP.fullDeleteClassifierZIP
);

module.exports = router;

const Router = require('express');
const router = new Router();
const classifier = require('../../controllers/warehouse/classifier');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getClassifier',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  classifier.getClassifier
);
router.post(
  '/newClassifier',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifier.newClassifier
);
router.post(
  '/deleteClassifier',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifier.deleteClassifier
);
router.post(
  '/getClassifierFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  classifier.getClassifierFromArchive
);
router.delete(
  '/fullDeleteClassifier',
  roleMiddleware(['SUPERADMIN']),
  classifier.fullDeleteClassifier
);

module.exports = router;

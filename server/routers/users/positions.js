const Router = require('express');
const router = new Router();
const positions = require('../../controllers/users/positions');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get('/getPositions', positions.getPositions);
router.post(
  '/newPosition',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  positions.newPosition
);
router.post(
  '/deletePosition',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  positions.deletePosition
);
router.post(
  '/getPositionFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  positions.getPositionFromArchive
);
router.delete(
  '/fullDeletePosition',
  roleMiddleware(['SUPERADMIN']),
  positions.fullDeletePosition
);

module.exports = router;

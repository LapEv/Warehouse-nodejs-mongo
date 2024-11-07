const Router = require('express');
const router = new Router();
const positions = require('../../controllers/users/positions');

router.get('/getPositions', positions.getPositions);
router.post('/newPosition', positions.newPosition);
router.post('/deletePosition', positions.deletePosition);
router.post('/getPositionFromArchive', positions.getPositionFromArchive);
router.delete('/fullDeletePosition', positions.fullDeletePosition);

module.exports = router;

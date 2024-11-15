const Router = require('express');
const { upload } = require('../../middleware/fileMiddleware');
const router = new Router();
const files = require('../../controllers/fileUtils/fileUtils');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.post(
  '/uploadFile',
  upload().fields([
    { name: 'files', maxCount: 1 },
    { name: 'gallery', maxCount: 8 },
  ]),
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  files.uploadFile
);

module.exports = router;

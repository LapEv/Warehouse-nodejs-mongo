const Router = require('express');
const { uploadArrival } = require('../../middleware/fileMiddleware');
const router = new Router();
const files = require('../../controllers/fileUtils/fileUtils');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.post(
  '/uploadFile',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  uploadArrival,
  files.uploadFile
);

module.exports = router;

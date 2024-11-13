const Router = require('express');
const router = new Router();
const users = require('../../controllers/users/users');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getUsers',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  users.getUsers
);
router.post('/newUser', users.newUser);
router.post(
  '/deleteUser',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  users.deleteUser
);
router.post(
  '/getUserFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  users.getUserFromArchive
);
router.delete(
  '/fullDeleteUser',
  roleMiddleware(['SUPERADMIN']),
  users.fullDeleteUser
);

module.exports = router;

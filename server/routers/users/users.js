const Router = require('express');
const router = new Router();
const users = require('../../controllers/users/users');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getUsers',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  users.getUsers
);
router.post('/newUser', users.newUser);
router.post('/login', users.login);
router.get('/check', authMiddleware, users.check);
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

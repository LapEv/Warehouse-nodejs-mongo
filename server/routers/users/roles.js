const Router = require('express');
const router = new Router();
const roles = require('../../controllers/users/roles');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get('/getRoles', roles.getRoles);
router.post('/newRole', roleMiddleware(['ADMIN', 'SUPERADMIN']), roles.newRole);
router.post(
  '/deleteRole',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  roles.deleteRole
);
router.post(
  '/getRoleFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  roles.getRoleFromArchive
);
router.delete(
  '/fullDeleteRole',
  roleMiddleware(['SUPERADMIN']),
  roles.fullDeleteRole
);

module.exports = router;

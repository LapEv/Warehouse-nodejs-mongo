const Router = require('express');
const router = new Router();
const roles = require('../../controllers/users/roles');

router.get('/getRoles', roles.getRoles);
router.post('/newRole', roles.newRole);
router.post('/deleteRole', roles.deleteRole);
router.post('/getRoleFromArchive', roles.getRoleFromArchive);
router.delete('/fullDeleteRole', roles.fullDeleteRole);

module.exports = router;

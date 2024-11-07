const Router = require('express');
const router = new Router();
const users = require('../../controllers/users/users');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/getUsers', users.getUsers);
router.post('/newUser', users.newUser);
router.post('/login', users.login);
router.get('/check', authMiddleware, users.check);
router.post('/deleteUser', users.deleteUser);
router.post('/getUserFromArchive', users.getUserFromArchive);
router.delete('/fullDeleteUser', users.fullDeleteUser);

module.exports = router;

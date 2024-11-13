const Router = require('express');
const router = new Router();
const clients = require('../../controllers/clients/clients');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getClients',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  clients.getClients
);
router.post(
  '/newClient',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  clients.newClient
);
router.post(
  '/deleteClient',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  clients.deleteClient
);
router.post(
  '/getClientFromArchive',
  roleMiddleware(['ADMIN', 'SUPERADMIN']),
  clients.getClientFromArchive
);
router.delete(
  '/fullDeleteClient',
  roleMiddleware(['SUPERADMIN']),
  clients.fullDeleteClient
);

module.exports = router;

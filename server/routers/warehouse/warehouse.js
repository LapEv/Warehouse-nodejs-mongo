const Router = require('express');
const router = new Router();
const warehouse = require('../../controllers/warehouse/warehouse');
const roleMiddleware = require('../../middleware/roleMiddleware');

router.get(
  '/getWarehouses',
  roleMiddleware([
    'ADMIN',
    'SUPERADMIN',
    'WAREHOUSE',
    'ENGINEER',
    'DISPATCHER',
  ]),
  warehouse.getWarehouses
);
// router.post(
//   '/newArrivalZIP',
//   roleMiddleware(['ADMIN', 'SUPERADMIN', 'WAREHOUSE']),
//   warehouse.newArrivalZIP
// );
// router.post(
//   '/newArrivalPodmena',
//   roleMiddleware(['ADMIN', 'SUPERADMIN', 'WAREHOUSE']),
//   warehouse.newArrivalPodmena
// );

module.exports = router;

const WarehouseZIP = require('../../models/warehouse/warehouseZIP');
const WarehousePodmena = require('../../models/warehouse/warehousePodmena');
const Users = require('../../models/users/users');
const Clients = require('../../models/clients/clients');

class warehouseController {
  async getWarehouses(_, res) {
    try {
      const users = await Users.find();
      const clients = await Clients.find();
      const warehousesUsers = users
        .filter((item) => (item.belongToWarehouse ? item : false))
        .map((item) => item.shortName);
      const warehousesClients = clients.map((item) => item.name);
      const warehouses = [...warehousesUsers, ...warehousesClients].sort();
      return res.json(warehouses);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка классификатора ЗИП: ${e.message}`,
      });
    }
  }

  async newZIP(req, res) {
    try {
      const { zip } = req.body;
      const checkZIP = await ZIP.findOne({ zip });
      if (checkZIP) {
        return res.status(400).json({
          result: 'error',
          message: 'Классификатор ЗИП с таким названием уже существует!',
        });
      }
      const newZIP = new ZIP(req.body);
      const result = await newZIP.save();
      return res.json({
        message: 'Классификатор ЗИП был успешно добавлен!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового классификатора ЗИП: ${e.message}`,
      });
    }
  }
}

module.exports = new warehouseController();

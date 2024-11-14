const Clients = require('../../models/clients/clients');

class clientsController {
  async getClients(_, res) {
    try {
      const clients = await Clients.find();
      return res.json(clients);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка клиентов: ${e.message}`,
      });
    }
  }

  async newClient(req, res) {
    try {
      const { legalName } = req.body;
      const checkClient = await Clients.findOne({ legalName });
      if (checkClient) {
        return res.status(400).json({
          result: 'error',
          message: 'Клиент с таким названием уже существует!',
        });
      }
      const newClient = new Clients(req.body);
      const result = await newClient.save();
      return res.json({
        message: 'Клиент был успешно добавлен!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового клиента: ${e.message}`,
      });
    }
  }

  async deleteClient(req, res) {
    try {
      const { _id } = req.body;
      const result = await Clients.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Клиент был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении клиента в архив: ${e.message}`,
      });
    }
  }

  async getClientFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Clients.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Клиент перемещен из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении клиента из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteClient(req, res) {
    try {
      const result = await Clients.findOneAndDelete(req.body);
      return res.json({
        message: 'Клиент был успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении клиента: ${e.message}`,
      });
    }
  }
}

module.exports = new clientsController();

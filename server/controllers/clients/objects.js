const Objects = require('../../models/clients/objects');

const includes = [
  {
    path: 'client',
    match: { status: 'ACTIVE' },
    select: ['legalName', 'name'],
  },
  { path: 'region', match: { status: 'ACTIVE' }, select: 'region' },
];

class objectsController {
  async getObjects(_, res) {
    try {
      const objects = await Objects.find().populate(includes);
      return res.json(objects);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка объектов: ${e.message}`,
      });
    }
  }

  async newObject(req, res) {
    try {
      const { object } = req.body;
      const checkObject = await Objects.findOne({ object });
      if (checkObject) {
        return res.status(400).json({
          result: 'error',
          message: 'Объект с таким названием уже существует!',
        });
      }
      const newObject = new Objects(req.body);
      const result = await newObject.save();
      return res.json({
        message: 'Объект был успешно добавлен!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового объекта: ${e.message}`,
      });
    }
  }

  async deleteObject(req, res) {
    try {
      const { _id } = req.body;
      const result = await Objects.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Объект был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении объекта в архив: ${e.message}`,
      });
    }
  }

  async getObjectFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Objects.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Объект перемещен из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении объекта из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteObject(req, res) {
    try {
      const result = await Objects.findOneAndDelete(req.body);
      return res.json({
        message: 'Объект была успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении объекта: ${e.message}`,
      });
    }
  }
}

module.exports = new objectsController();

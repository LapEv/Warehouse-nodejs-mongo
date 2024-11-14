const ClassifierZIP = require('../../models/warehouse/classifierZIP');

const includes = [
  {
    path: 'classifier',
    match: { status: 'ACTIVE' },
    select: 'classifier',
  },
  {
    path: 'model',
    match: { status: 'ACTIVE' },
    select: 'model',
  },
];

class classifierZIPController {
  async getClassifierZIP(_, res) {
    try {
      const classifierZIP = await ClassifierZIP.find().populate(includes);
      return res.json(classifierZIP);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка классификатора ЗИП: ${e.message}`,
      });
    }
  }

  async newClassifierZIP(req, res) {
    try {
      const { classifierZIP } = req.body;
      const checkClassifierZIP = await ClassifierZIP.findOne({ classifierZIP });
      if (checkClassifierZIP) {
        return res.status(400).json({
          result: 'error',
          message: 'Классификатор ЗИП с таким названием уже существует!',
        });
      }
      const newClassifierZIP = new ClassifierZIP(req.body);
      const result = await newClassifierZIP.save();
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

  async deleteClassifierZIP(req, res) {
    try {
      const { _id } = req.body;
      const result = await ClassifierZIP.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Классификатор ЗИП был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении классификатора ЗИП в архив: ${e.message}`,
      });
    }
  }

  async getClassifierZIPFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await ClassifierZIP.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Классификатор ЗИП перемещен из архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении классификатора ЗИП из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteClassifierZIP(req, res) {
    try {
      const result = await ClassifierZIP.findOneAndDelete(req.body);
      return res.json({
        message: 'Классификатор ЗИП был успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении классификатора ЗИП: ${e.message}`,
      });
    }
  }
}

module.exports = new classifierZIPController();

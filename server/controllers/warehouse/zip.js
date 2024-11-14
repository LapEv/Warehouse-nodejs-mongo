const ZIP = require('../../models/warehouse/zip');

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

class zipController {
  async getZIP(_, res) {
    try {
      const zip = await ZIP.find().populate(includes);
      return res.json(zip);
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

  async deleteZIP(req, res) {
    try {
      const { _id } = req.body;
      const result = await ZIP.updateOne({ _id: _id }, { status: 'NO_ACTIVE' });
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

  async getZIPFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await ZIP.updateOne({ _id: _id }, { status: 'ACTIVE' });
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

  async fullDeleteZIP(req, res) {
    try {
      const result = await ZIP.findOneAndDelete(req.body);
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

module.exports = new zipController();

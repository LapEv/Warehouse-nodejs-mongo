const Regions = require('../../models/clients/regions');

class clientsController {
  async getRegions(_, res) {
    try {
      const regions = await Regions.find();
      return res.json(regions);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка регионов: ${e.message}`,
      });
    }
  }

  async newRegion(req, res) {
    try {
      const { region } = req.body;
      const checkRegion = await Regions.findOne({ region });
      if (checkRegion) {
        return res.status(400).json({
          result: 'error',
          message: 'Регион с таким названием уже существует!',
        });
      }
      const newRegion = new Regions(req.body);
      const result = await newRegion.save();
      return res.json({
        message: 'Регион был успешно добавлен!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового региона: ${e.message}`,
      });
    }
  }

  async deleteRegion(req, res) {
    try {
      const { _id } = req.body;
      const result = await Regions.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Регион был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении региона в архив: ${e.message}`,
      });
    }
  }

  async getRegionFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Regions.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Регион перемещен из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении региона из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteRegion(req, res) {
    try {
      const result = await Regions.findOneAndDelete(req.body);
      return res.json({
        message: 'Регион была успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении региона: ${e.message}`,
      });
    }
  }
}

module.exports = new clientsController();

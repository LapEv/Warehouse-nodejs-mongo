const Models = require('../../models/warehouse/models');

const includes = [
  {
    path: 'classifier',
    match: { status: 'ACTIVE' },
    select: 'classifier',
  },
];

class modelsController {
  async getModels(_, res) {
    try {
      const models = await Models.find().populate(includes);
      return res.json(models);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка моделей: ${e.message}`,
      });
    }
  }

  async newModel(req, res) {
    try {
      const { model } = req.body;
      const checkModel = await Models.findOne({ model });
      if (checkModel) {
        return res.status(400).json({
          result: 'error',
          message: 'Модель с таким названием уже существует!',
        });
      }
      const newModel = new Models(req.body);
      const result = await newModel.save();
      return res.json({
        message: 'Модель была успешна добавлена!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании новой модели: ${e.message}`,
      });
    }
  }

  async deleteModel(req, res) {
    try {
      const { _id } = req.body;
      const result = await Models.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Модель был перемещена в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении модели в архив: ${e.message}`,
      });
    }
  }

  async getModelFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Models.updateOne({ _id: _id }, { status: 'ACTIVE' });
      return res.json({
        message: 'Модель перемещена из архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении модели из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteModel(req, res) {
    try {
      const result = await Models.findOneAndDelete(req.body);
      return res.json({
        message: 'Модель была успешно удалена!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении модели: ${e.message}`,
      });
    }
  }
}

module.exports = new modelsController();

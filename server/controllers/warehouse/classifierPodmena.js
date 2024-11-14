const ClassifierPodmena = require('../../models/warehouse/classifierPodmena');

const includes = [
  {
    path: 'classifier',
    match: { status: 'ACTIVE' },
    select: 'classifier',
  },
];

class classifierPodmenaController {
  async getClassifierPodmena(_, res) {
    try {
      const classifierPodmena = await ClassifierPodmena.find().populate(
        includes
      );
      return res.json(classifierPodmena);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка классификатора подмены: ${e.message}`,
      });
    }
  }

  async newClassifierPodmena(req, res) {
    try {
      const { classifierPodmena } = req.body;
      const checkClassifierPodmena = await ClassifierPodmena.findOne({
        classifierPodmena,
      });
      if (checkClassifierPodmena) {
        return res.status(400).json({
          result: 'error',
          message: 'Классификатор подмены с таким названием уже существует!',
        });
      }
      const newClassifierPodmena = new ClassifierPodmena(req.body);
      const result = await newClassifierPodmena.save();
      return res.json({
        message: 'Классификатор подмены был успешно добавлен!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового классификатора подмены: ${e.message}`,
      });
    }
  }

  async deleteClassifierPodmena(req, res) {
    try {
      const { _id } = req.body;
      const result = await ClassifierPodmena.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Классификатор подмены был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении классификатора подмены в архив: ${e.message}`,
      });
    }
  }

  async getClassifierPodmenaFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await ClassifierPodmena.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Классификатор подмены перемещен из архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении классификатора подмены из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteClassifierPodmena(req, res) {
    try {
      const result = await ClassifierPodmena.findOneAndDelete(req.body);
      return res.json({
        message: 'Классификатор подмены был успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении классификатора подмены: ${e.message}`,
      });
    }
  }
}

module.exports = new classifierPodmenaController();

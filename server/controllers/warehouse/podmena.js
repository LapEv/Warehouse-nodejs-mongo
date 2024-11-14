const Podmena = require('../../models/warehouse/Podmena');

const includes = [
  {
    path: 'classifier',
    match: { status: 'ACTIVE' },
    select: 'classifier',
  },
];

class podmenaController {
  async getPodmena(_, res) {
    try {
      const podmena = await Podmena.find().populate(includes);
      return res.json(podmena);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка классификатора подмены: ${e.message}`,
      });
    }
  }

  async newPodmena(req, res) {
    try {
      const { podmena } = req.body;
      const checkPodmena = await Podmena.findOne({
        podmena,
      });
      if (checkPodmena) {
        return res.status(400).json({
          result: 'error',
          message: 'Классификатор подмены с таким названием уже существует!',
        });
      }
      const newPodmena = new Podmena(req.body);
      const result = await newPodmena.save();
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

  async deletePodmena(req, res) {
    try {
      const { _id } = req.body;
      const result = await Podmena.updateOne(
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

  async getPodmenaFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Podmena.updateOne(
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

  async fullDeletePodmena(req, res) {
    try {
      const result = await Podmena.findOneAndDelete(req.body);
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

module.exports = new podmenaController();

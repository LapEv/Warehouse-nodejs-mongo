const Classifier = require('../../models/warehouse/classifier');

class classifierController {
  async getClassifier(_, res) {
    try {
      const classifier = await Classifier.find();
      return res.json(classifier);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка классификатора: ${e.message}`,
      });
    }
  }

  async newClassifier(req, res) {
    try {
      const { classifier } = req.body;
      console.log('classifier = ', classifier);
      const checkClassifier = await Classifier.findOne({ classifier });
      console.log('checkClassifier = ', checkClassifier);
      if (checkClassifier) {
        return res.status(400).json({
          result: 'error',
          message: 'Классификатор с таким названием уже существует!',
        });
      }
      const newClassifier = new Classifier(req.body);
      console.log('newClassifier = ', newClassifier);
      const result = await newClassifier.save();
      console.log('result = ', result);
      return res.json({
        message: 'Классификатор был успешно добавлен!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового классификатора: ${e.message}`,
      });
    }
  }

  async deleteClassifier(req, res) {
    try {
      const { _id } = req.body;
      const result = await Classifier.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Классификатор был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении классификатора в архив: ${e.message}`,
      });
    }
  }

  async getClassifierFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Classifier.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Классификатор перемещен из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении классификатора из архива: ${e.message}`,
      });
    }
  }

  async fullDeleteClassifier(req, res) {
    try {
      const result = await Classifier.findOneAndDelete(req.body);
      return res.json({
        message: 'Классификатор была успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении классификатора: ${e.message}`,
      });
    }
  }
}

module.exports = new classifierController();

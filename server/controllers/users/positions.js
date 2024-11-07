const Positions = require('../../models/users/positions');

class positionsController {
  async getPositions(_, res) {
    try {
      const positions = await Positions.find();
      return res.json(positions);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка должностей: ${e.message}`,
      });
    }
  }

  async newPosition(req, res) {
    try {
      const { position } = req.body;
      const check = await Positions.findOne({ value: position });
      if (check) {
        return res.status(400).json({
          result: 'error',
          message: 'Должность с таким названием уже существует!',
        });
      }
      const newPosition = new Positions({
        value: position,
      });
      const result = await newPosition.save();
      return res.json({ message: 'Должность была успешно добавлена!', result });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании новой должности: ${e.message}`,
      });
    }
  }

  async deletePosition(req, res) {
    try {
      const { _id } = req.body;
      const result = await Positions.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Должность была перемещена в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении должности в архив: ${e.message}`,
      });
    }
  }

  async getPositionFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Positions.updateOne(
        { _id: _id },
        { status: 'ACTIVE' }
      );
      return res.json({
        message: 'Должность перемещена из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении должности из архив: ${e.message}`,
      });
    }
  }

  async fullDeletePosition(req, res) {
    try {
      const result = await Positions.findOneAndDelete(req.body);
      return res.json({
        message: 'Должность была успешно удалена!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении должности: ${e.message}`,
      });
    }
  }
}

module.exports = new positionsController();

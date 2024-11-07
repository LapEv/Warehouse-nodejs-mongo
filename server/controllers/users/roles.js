const Roles = require('../../models/users/roles');

class rolesController {
  async getRoles(_, res) {
    try {
      const roles = await Roles.find();
      return res.json(roles);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка ролей: ${e.message}`,
      });
    }
  }

  async newRole(req, res) {
    try {
      const { role } = req.body;
      const checkRole = await Roles.findOne({ value: role });
      if (checkRole) {
        return res.status(400).json({
          result: 'error',
          message: 'Роль с таким названием уже существует!',
        });
      }
      const newRole = new Roles({
        value: role,
      });
      const result = await newRole.save();
      return res.json({
        message: 'Роль была успешно добавлена!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании новой роли: ${e.message}`,
      });
    }
  }

  async deleteRole(req, res) {
    try {
      const { _id } = req.body;
      const result = await Roles.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Роль была перемещена в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении роли в архив: ${e.message}`,
      });
    }
  }

  async getRoleFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Roles.updateOne({ _id: _id }, { status: 'ACTIVE' });
      return res.json({
        message: 'Роль перемещена из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении роли из архив: ${e.message}`,
      });
    }
  }

  async fullDeleteRole(req, res) {
    try {
      const result = await Roles.findOneAndDelete(req.body);
      return res.json({
        message: 'Роль была успешно удалена!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении роли: ${e.message}`,
      });
    }
  }
}

module.exports = new rolesController();

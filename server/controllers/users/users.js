const Users = require('../../models/users/users');
const bcrypt = require('bcryptjs');
const generateAccessToken = require('../../utils/generateAccessToken');

class usersController {
  async getUsers(_, res) {
    try {
      const users = await Users.find();
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при получении списка пользователей: ${e.message}`,
      });
    }
  }

  async newUser(req, res) {
    try {
      const { username, password } = req.body;
      const check = await Users.findOne({ value: username });
      if (check) {
        return res.status(400).json({
          result: 'error',
          message: 'Пользователь с таким названием уже существует!',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const newUser = new Users({ ...req.body, password: hashPassword });
      const { id, roles } = await newUser.save();
      const token = generateAccessToken(id, roles, username);
      return res.json({
        message: 'Пользователь был успешно добавлен!',
        token,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при создании нового пользователя: ${e.message}`,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username });
      if (!user) {
        return res.status(400).json({
          result: 'error',
          message: 'Пользователь с таким именем не существует!',
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          result: 'error',
          message: 'Неверный пароль!',
        });
      }
      const token = generateAccessToken(user._id, user.roles, user.username);
      return res.json(token);
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: `${APInotifications.auth.loginError}: ${e.message}` });
    }
  }

  async check(req, res) {
    try {
      console.log('req.user = ', req.user);
      const token = generateAccessToken(
        req.user.id,
        req.user.roles,
        req.user.username
      );
      console.log('check token = ', token);
      return res.json(token);
    } catch (e) {
      return res.status(400).json({ message: `${e.message}` });
    }
  }

  async deleteUser(req, res) {
    try {
      const { _id } = req.body;
      const result = await Users.updateOne(
        { _id: _id },
        { status: 'NO_ACTIVE' }
      );
      return res.json({
        message: 'Пользователь был перемещен в архив',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении пользователя в архив: ${e.message}`,
      });
    }
  }

  async getUserFromArchive(req, res) {
    try {
      const { _id } = req.body;
      const result = await Users.updateOne({ _id: _id }, { status: 'ACTIVE' });
      return res.json({
        message: 'Пользователь перемещен из архива',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при перемещении пользователя из архив: ${e.message}`,
      });
    }
  }

  async fullDeleteUser(req, res) {
    try {
      const result = await Users.findOneAndDelete(req.body);
      return res.json({
        message: 'Пользователь был успешно удален!',
        result,
      });
    } catch (e) {
      return res.status(400).json({
        result: 'error',
        message: `Ошибка при удалении пользователя: ${e.message}`,
      });
    }
  }
}

module.exports = new usersController();

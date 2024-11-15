class filesController {
  async uploadFile(_req, res) {
    try {
      res.status(201).json({ message: 'Файл загружен успешно!' });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        result: 'error',
        message: `Ошибка при загрузке файла: ${e.message}`,
      });
    }
  }
}

module.exports = new filesController();

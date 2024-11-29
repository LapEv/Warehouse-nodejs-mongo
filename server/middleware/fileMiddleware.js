const fs = require('fs');
const path = require('path');
const getToday = require('../utils/getToday');

function uploadArrival(req, res) {
  if (!req.files.uploadArrival)
    return res.status(400).json({
      result: 'error',
      message: 'Нет файлов или не правильный ключ загрузки "uploadArrival"!',
    });
  if (!req.body.uploadFilesName)
    return res.status(400).json({
      result: 'error',
      message:
        'Нет имен файлов или не правильный ключ загрузки "uploadFilesName"!',
    });
  const files =
    !Array.isArray(req.files.uploadArrival) || !req.files.uploadArrival.length
      ? [req.files.uploadArrival]
      : req.files.uploadArrival;
  const fileNames =
    !Array.isArray(req.body.uploadFilesName) || !req.body.uploadFilesName.length
      ? [req.body.uploadFilesName]
      : req.body.uploadFilesName;
  if (files.length >= 10) 
    return res.status(400).json({
      result: 'error',
      maessage: 'Максимально доупустимое число файлов 10!'
    })
  const today = getToday();
  const dirPath = path.join(__dirname, `../Files/Acts/ArrivalZIP/${today}`);
  let countFiles;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    countFiles = 1;
  } else {
    countFiles = fs.readdirSync(dirPath).length + 1;
  }
  const arrFilesPath = Array.from(files).map((file, index) => {
    const filePath = path.join(
      `${dirPath}/${countFiles + index}_${fileNames[index]}`
    );
    if (fs.existsSync(filePath)) {
      return res.status(400).json({
        result: 'error',
        message: 'Путь или файл не существует!',
      });
    }
    file.mv(filePath);
    return filePath;
  });
  return arrFilesPath;
}

module.exports = { uploadArrival };

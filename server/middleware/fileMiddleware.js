const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

function upload() {
  const mongodbUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  // const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@cluster0.vlhig1a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    dest: 'uploads/',
    file: (req, file) => {
      console.log('file = ', file);
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: !/[^\u0000-\u00ff]/.test(file.originalname)
            ? Buffer.from(file.originalname, 'latin1').toString('utf8')
            : file.originalname,
          bucketName: 'filesBucket',
        };
        console.log('fileInfo = ', fileInfo);
        resolve(fileInfo);
      });
    },
  });

  // console.log('storage = ', storage);
  return multer({ storage });
}

module.exports = { upload };

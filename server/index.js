const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require('./routers/index');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
const dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const start = async () => {
  try {
    await mongoose.connect(dbURL);
    // bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //   bucketName: 'filesBucket',
    // });
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

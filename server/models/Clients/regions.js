const { Schema, model } = require('mongoose');

const Regions = new Schema({
  region: { type: String, unique: true, required: true, default: '' },
  status: { type: String, required: true, default: 'ACTIVE' },
});

module.exports = model('regions', Regions);

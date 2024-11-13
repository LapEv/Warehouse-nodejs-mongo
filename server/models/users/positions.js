const { Schema, model } = require('mongoose');

const Positions = new Schema({
  position: { type: String, unique: true, required: true, default: '' },
  status: { type: String, required: true, default: 'ACTIVE' },
});

module.exports = model('positions', Positions);

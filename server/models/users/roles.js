const { Schema, model } = require('mongoose');

const Roles = new Schema({
  role: { type: String, unique: true, required: true, default: 'USER' },
  status: { type: String, required: true, default: 'ACTIVE' },
});

module.exports = model('roles', Roles);

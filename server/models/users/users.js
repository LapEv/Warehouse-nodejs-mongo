const { Schema, model } = require('mongoose');

const Users = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, reqiured: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  positions: { type: String, required: true, ref: 'Positions' },
  roles: [{ type: String, required: true, ref: 'Roles' }],
  belongToWarehouse: { type: Boolean, required: true },
  status: { type: String, required: true, default: 'ACTIVE' },
});

module.exports = model('users', Users);

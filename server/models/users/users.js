const { Schema, model } = require('mongoose');

const Users = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, reqiured: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  shortName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  position: { type: Schema.ObjectId, ref: 'positions' },
  roles: [{ type: Schema.ObjectId, ref: 'roles' }],
  belongToWarehouse: { type: Boolean, required: true },
  status: { type: String, required: true, default: 'ACTIVE' },
});

module.exports = model('users', Users);

const { Schema, model } = require('mongoose');

const Clients = new Schema(
  {
    legalName: { type: String, unique: true, required: true, default: '' },
    name: { type: String, unique: true, required: true, default: '' },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('clients', Clients);

const { Schema, model } = require('mongoose');

const Objects = new Schema(
  {
    client: { type: Schema.ObjectId, ref: 'clients' },
    region: { type: Schema.ObjectId, ref: 'regions' },
    object: { type: String, unique: true, required: true, default: '' },
    address: { type: String, required: true, default: '' },
    coordinates: { type: String, required: true, default: '' },
    clientName: { type: String, required: false, default: '' },
    clientID: { type: String, required: false, default: '' },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('objects', Objects);

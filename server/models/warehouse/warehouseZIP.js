const { Schema, model } = require('mongoose');

const WarehouseZIP = new Schema(
  {
    zip: { type: Schema.ObjectId, ref: 'zip' },
    classifier: { type: Schema.ObjectId, ref: 'classifier' },
    model: { type: Schema.ObjectId, ref: 'models' },
    serialNumber: { type: String, required: false, default: '' },
    warehouse: { type: Schema.ObjectId, ref: 'users' },
    arrivalDate: { type: Date, required: true },
    arrivalComment: { type: String, required: false },
    arrivalActs: { type: String, required: false },
    movements: [
      {
        date: { type: Date, required: true },
        username: { type: Schema.ObjectId, ref: 'users' },
        movementFrom: { type: Schema.ObjectId, ref: 'users' },
        movementTo: { type: Schema.ObjectId, ref: 'users' },
        comments: { type: String, required: false },
      },
    ],
    closingDate: { type: Date, required: true },
    closingUser: { type: Schema.ObjectId, ref: 'users' },
    closingFrom: { type: Schema.ObjectId, ref: 'users' },
    closingTo: { type: Schema.ObjectId, ref: 'users' },
    closingComment: { type: String, required: false },
    closingActs: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = model('warehouseZIP', WarehouseZIP);

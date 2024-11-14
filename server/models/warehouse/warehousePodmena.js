const { Schema, model } = require('mongoose');

const WarehousePodmena = new Schema(
  {
    podmena: { type: Schema.ObjectId, ref: 'podmena' },
    classifier: { type: Schema.ObjectId, ref: 'classifier' },
    serialNumber: { type: String, required: true, default: '' },
    belongsTo: { type: Schema.ObjectId, ref: 'clients' },
    belongsToObject: { type: Schema.ObjectId, ref: 'objects' },
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
    closingDate: { type: Date, required: false },
    closingUser: { type: Schema.ObjectId, ref: 'users' },
    closingFrom: { type: Schema.ObjectId, ref: 'users' },
    closingTo: { type: Schema.ObjectId, ref: 'users' },
    closingComment: { type: String, required: false },
    closingActs: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = model('warehousePodmena', WarehousePodmena);

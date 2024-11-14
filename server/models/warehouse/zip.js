const { Schema, model } = require('mongoose');

const ZIP = new Schema(
  {
    classifier: { type: Schema.ObjectId, ref: 'classifier' },
    model: { type: Schema.ObjectId, ref: 'models' },
    zip: { type: String, unique: true, required: true, default: '' },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('zip', ZIP);

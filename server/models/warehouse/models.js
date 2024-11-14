const { Schema, model } = require('mongoose');

const Models = new Schema(
  {
    classifier: { type: Schema.ObjectId, ref: 'classifier' },
    model: { type: String, unique: true, required: true, default: '' },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('models', Models);

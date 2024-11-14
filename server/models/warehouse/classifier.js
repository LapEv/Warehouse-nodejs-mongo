const { Schema, model } = require('mongoose');

const Classifier = new Schema(
  {
    classifier: { type: String, unique: true, required: true, default: '' },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('classifier', Classifier);

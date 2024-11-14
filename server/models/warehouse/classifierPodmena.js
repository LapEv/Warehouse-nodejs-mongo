const { Schema, model } = require('mongoose');

const ClassifierPodmena = new Schema(
  {
    classifier: { type: Schema.ObjectId, ref: 'classifier' },
    classifierPodmena: {
      type: String,
      unique: true,
      required: true,
      default: '',
    },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('classifierPodmena', ClassifierPodmena);

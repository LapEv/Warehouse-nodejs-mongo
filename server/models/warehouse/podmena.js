const { Schema, model } = require('mongoose');

const Podmena = new Schema(
  {
    classifier: { type: Schema.ObjectId, ref: 'classifier' },
    podmena: {
      type: String,
      unique: true,
      required: true,
      default: '',
    },
    status: { type: String, required: true, default: 'ACTIVE' },
  },
  { timestamps: true }
);

module.exports = model('podmena', Podmena);

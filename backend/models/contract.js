const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contractSchema = mongoose.Schema({
  invoice: { type: mongoose.ObjectId, ref: 'Invoice', required: true },
  payments: [{ type: mongoose.ObjectId, ref: 'Payment' }],
  status: { type: String, required: true },
  version: { type: String, required: true },
  total: { type: String },
  created: { type: Date, required: true },
  lastUpdate: { type: Date, required: true },
});

contractSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contract', contractSchema);

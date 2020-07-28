const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const invoiceSchema = mongoose.Schema({
  author: { type: mongoose.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  coordination: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  service: { type: String, required: true },
  contractor: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
  status: { type: String, required: true },
  trello: { type: Boolean, required: true },
});

invoiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Invoice', invoiceSchema);
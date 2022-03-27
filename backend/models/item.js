const mongoose = require('mongoose');
const validator = require('validator');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('item', itemSchema);

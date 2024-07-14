const mongoose = require('mongoose');

const laundryItemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String }
});

const LaundryItem = mongoose.model('LaundryItem', laundryItemSchema);

module.exports = LaundryItem;

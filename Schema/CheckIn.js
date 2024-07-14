const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to generate a random five-digit number
function generateReservationId() {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
  return `${timestamp.substr(-4)}-${randomDigits}`;
}

const checkInSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true },
  floor: { type: String, required: true },
  selectAll: { type: Boolean, required: true },
  towel: { type: Boolean, required: true },
  soap: { type: Boolean, required: true },
  facewash: { type: Boolean, required: true },
  brush: { type: Boolean, required: true },
  price: { type: Number, required: true },
  secondDealPrice: { type: Number },
  dealType: { type: String },
  totalPayableAmount: { type: Number },
  reservationId: { type: String, unique: true, default: generateReservationId },
  createdAt: { type: Date, default: Date.now }
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to generate a 6-digit random number
const generateBookingId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Define the schema for a booking
const BookingSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true }, // Price of the room
  guests: { type: Number, required: true },
  floor: { type: String, required: true },
  soap: { type: Boolean, default: false },
  towel: { type: Boolean, default: false },
  brush: { type: Boolean, default: false },
  facewash: { type: Boolean, default: false },
  restaurantMenuItems: [{ type: Object }],
  laundryItems: [{ type: Object }],
  dealType: { type: String },
  dealPrice: { type: Number },
  totalPayableAmount: { type: Number, required: true },
  currentPaymentAmount: { type: Number },
  paymentType:{type:String},
  BookingId: { type: String, unique: true }
});

// Middleware to generate BookingId before saving a new booking
BookingSchema.pre('save', function (next) {
  if (this.isNew) {
    this.BookingId = generateBookingId().toString();
  }
  next();
});

// Create and export the Booking model
const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

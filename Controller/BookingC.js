const Booking = require('../Schema/Booking');
const Room = require('../Schema/Room');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    // Extract roomNumber directly from req.body
    const roomNumber = req.body.roomNumber;
    const bookingData = req.body;

    // Log the request body to debug
    console.log('Request body:', req.body);

    // Validate that roomNumber is provided
    if (!roomNumber) {
      return res.status(400).json({ message: 'roomNumber is required' });
    }

    // Create and save the new booking
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    // Find and update the room status
    const room = await Room.findOne({ roomNumber: roomNumber });
    if (room) {
      room.roomStatus = 'Booked';
      await room.save();
      res.status(201).json(savedBooking);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error creating booking:', error); // Log detailed error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { restaurantMenuItems, laundryItems, totalPayment } = req.body;

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Add new restaurant menu items to the existing ones
    if (Array.isArray(restaurantMenuItems)) {
      booking.restaurantMenuItems.push(...restaurantMenuItems);
    }

    // Add new laundry items to the existing ones
    if (Array.isArray(laundryItems)) {
      booking.laundryItems.push(...laundryItems);
    }

    // Update totalPayableAmount with the provided totalPayment
    if (typeof totalPayment === 'number') {
      // Add the new payment amount to the existing total
      booking.totalPayableAmount += totalPayment;
  }
  

    // Save updated booking
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

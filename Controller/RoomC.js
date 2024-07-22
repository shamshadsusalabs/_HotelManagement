

const bucket = require('../config/firebaseConfig');  // Assuming you have configured your Firebase/GCS bucket
const Room = require('../Schema/Room');

exports.UpdateStatus = async (req, res) => {
  try {
    // Extract roomNumber directly from req.params
    const { roomNumber } = req.params;
    const { roomStatus } = req.body; // Assuming roomStatus is directly available in req.body

    // Log the roomNumber and request body to debug
    console.log('Room number:', roomNumber);
    console.log('Request body:', req.body);

    // Validate that roomNumber is provided
    if (!roomNumber) {
      return res.status(400).json({ message: 'Room number is required' });
    }

    // Validate that roomStatus is provided
    if (!roomStatus) {
      return res.status(400).json({ message: 'Room status is required' });
    }

    // Find and update the room status
    const room = await Room.findOne({ roomNumber: roomNumber });
    if (room) {
      room.roomStatus = roomStatus; // Assign new room status
      await room.save();
      res.status(200).json(room); // Respond with updated room object if needed
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error updating room status:', error); // Log detailed error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, bedType, roomFloor, roomFacility, roomStatus , roomPrice } = req.body;

    // Validate required fields
    if (!roomNumber || !bedType || !roomFloor || !roomPrice) {
      return res.status(400).json({ message: 'Room number, bed type, and floor,Room price are required fields.' });
    }

    // Handle room images if uploaded
    let roomImages = [];
    if (req.files && req.files.length > 0) {
      roomImages = await Promise.all(req.files.map(async (file) => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        // Return promise for file upload
        return new Promise((resolve, reject) => {
          blobStream.on('error', (err) => {
            reject(err);
          });

          blobStream.on('finish', async () => {
            try {
              await blob.makePublic();
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              
              // Resolve file information
              resolve({
                fileName: file.originalname,
                fileUrl: publicUrl,
              });
            } catch (err) {
              reject(err);
            }
          });

          blobStream.end(file.buffer);
        });
      }));
    }

    // Create new room object
    const newRoom = new Room({
      roomNumber,
      bedType,
      roomFloor,
      roomFacility,
      roomStatus: roomStatus || 'Available', 
      roomPrice, // Default to 'Available' if not provided
      roomImages
    });

    // Save room to database
    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Error creating room.', error: error.message });
  }
};

// Get all rooms
// Get all rooms excluding roomImages
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}, '-roomImages'); // Exclude roomImages field

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms.', error: error.message });
  }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a room by ID
exports.updateRoom = async (req, res) => {
  try {
    const { roomNumber, bedType, roomFloor, roomFacility, roomStatus } = req.body;
    const _id = req.params.id; // Assuming _id is passed as a route parameter

    // Validate required fields
    if (!_id || !roomNumber || !bedType || !roomFloor || !roomPrice) {
      return res.status(400).json({ message: 'Room ID, room number, bed type, and floor, Room price are required fields.' });
    }

    // Handle room images if uploaded
    let roomImages = [];
    if (req.files && req.files.length > 0) {
      roomImages = await Promise.all(req.files.map(async (file) => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        // Return promise for file upload
        return new Promise((resolve, reject) => {
          blobStream.on('error', (err) => {
            reject(err);
          });

          blobStream.on('finish', async () => {
            try {
              await blob.makePublic();
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              
              // Resolve file information
              resolve({
                fileName: file.originalname,
                fileUrl: publicUrl,
              });
            } catch (err) {
              reject(err);
            }
          });

          blobStream.end(file.buffer);
        });
      }));
    }

    // Update room in database
    const updatedRoom = await Room.findByIdAndUpdate(_id, {
      roomNumber,
      bedType,
      roomFloor,
      roomFacility,
      roomStatus: roomStatus || 'Available', 
      roomPrice, // Default to 'Available' if not provided
      roomImages
    }, { new: true });

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Error updating room.', error: error.message });
  }
};


// Delete a room by ID
exports.deleteRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }
    res.status(200).send({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.getAvailableRooms = async (req, res) => {
  try {
      const availableRooms = await Room.find({ roomStatus: 'Available' });
      res.status(200).send(availableRooms);
  } catch (error) {
      res.status(500).send(error);
  }
};
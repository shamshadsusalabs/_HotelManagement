const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Room Schema
const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true // Ensure room numbers are unique
    },
    bedType: {
        type: String,
        enum: ['Single Bed', 'Double Bed', 'Triple Bed', 'VIP'],
        required: true
    },
    roomFloor: {
        type: String,
        required: true
    },
    roomFacility: {
        type: String
    },
    roomPrice: {
        type: Number, // Changed to Number for better handling of price
        required: true
    },
    roomStatus: {
        type: String,
        enum: ['Available', 'Booked', 'Reserved', 'Waitlist', 'Blocked'],
        default: 'Available'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    roomImages: [
        {
            fileName: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create indexes
roomSchema.index({ roomNumber: 1 });
roomSchema.index({ roomStatus: 1 });

// Create a model based on the schema
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

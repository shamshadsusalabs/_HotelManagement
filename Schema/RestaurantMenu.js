const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantMenu = new Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('RestaurantMenu', RestaurantMenu);


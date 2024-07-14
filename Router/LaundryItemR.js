const express = require('express');
const router = express.Router();
const laundryController = require('../Controller/LaundryItemC');
const  authenticateToken  = require('../Middileware/User.auth');
// Create a new laundry item
router.post('/items', authenticateToken  , laundryController.createItem);

// Get all laundry items
router.get('/items',  authenticateToken  ,laundryController.getItems);

// Get a specific laundry item by ID
router.get('/items/:id', authenticateToken  , laundryController.getItemById);

// Update a laundry item by ID
router.put('/items/:id', authenticateToken  , laundryController.updateItem);

// Delete a laundry item by ID
router.delete('/items/:id', authenticateToken  , laundryController.deleteItem);

module.exports = router;
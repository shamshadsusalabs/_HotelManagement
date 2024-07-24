const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserC');
const  authenticateToken  = require('../Middileware/User.auth');
// Register a new user
// router.post('/register', userController.register);

// Login a user
router.post('/login', userController.login);

// Logout a user
router.post('/logout',authenticateToken, userController.logout);

// Get all users
router.get('/GetAllUsers', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;

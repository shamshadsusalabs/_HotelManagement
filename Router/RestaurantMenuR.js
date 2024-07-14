const express = require('express');
const router = express.Router();
const menuController = require('../Controller/RestaurantMenuC');
const  authenticateToken  = require('../Middileware/User.auth');
// Routes for CRUD operations
router.get('/menus',  authenticateToken ,menuController.getAllMenuItems);
router.get('/menus/:id', authenticateToken , menuController.getMenuItemById);
router.post('/menus', authenticateToken , menuController.createMenuItem);
router.put('/menus/:id', authenticateToken , menuController.updateMenuItem);
router.delete('/menus/:id',  authenticateToken ,menuController.deleteMenuItem);

module.exports = router;

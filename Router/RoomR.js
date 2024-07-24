const express = require('express');
const router = express.Router();
const roomController = require('../Controller/RoomC');
const upload = require('../Middileware/multerMiddleware');
const  authenticateToken  = require('../Middileware/User.auth');



router.post('/rooms', upload.array('roomImages', 10),authenticateToken, roomController.createRoom);
router.get('/rooms',authenticateToken, roomController.getAllRooms);
router.get('/rooms/:id',authenticateToken, roomController.getRoomById);
router.put('/rooms/:id',upload.array('roomImages', 10),authenticateToken, roomController.updateRoom );
router.delete('/rooms/:id',authenticateToken , roomController.deleteRoomById);
router.get('/roomsAvailable',authenticateToken, roomController.getAvailableRooms);
router.patch('/rooms/:roomNumber' ,authenticateToken, roomController.UpdateStatus);

module.exports = router;

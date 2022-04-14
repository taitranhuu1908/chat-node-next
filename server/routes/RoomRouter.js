const router = require('express').Router();
const RoomController = require('../controllers/RoomController');
const auth = require('../middleware/Authentication');

router.get('/', RoomController.findAll);
router.post('/', auth, RoomController.create);
router.get('/leave-room/:roomId', auth, RoomController.leaveRoom);
router.get('/:roomId', auth, RoomController.findById);

module.exports = router;

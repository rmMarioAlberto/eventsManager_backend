const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');

router.get('/getEvents', eventosController.getEvents);
router.post('/getEventsById', eventosController.getEventsById);
router.post('/addEvent', eventosController.addEvent);
router.put('/updateEvent', eventosController.updateEvent);
router.delete('/deleteEvent', eventosController.deleteEvent);

module.exports = router;
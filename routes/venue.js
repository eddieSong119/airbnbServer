const express = require('express');
const venueController = require('../controllers/venueController');

const router = express.Router();

router.get('/:id', venueController.getById);

module.exports = router;
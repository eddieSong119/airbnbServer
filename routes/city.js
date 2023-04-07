const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

router.get('/:id', cityController.getById);

module.exports = router;
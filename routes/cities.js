const express = require('express');
const citiesController = require('../controllers/citiesController');

const router = express.Router();

router.get('/:feature', citiesController.getFeatured);

module.exports = router;
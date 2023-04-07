const express = require('express');
const activitiesController = require('../controllers/activitiesController');

const router = express.Router();

router.get('/:feature', activitiesController.getFeatured);

module.exports = router;
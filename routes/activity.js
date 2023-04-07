const express = require('express');
const activityController = require('../controllers/activityController');

const router = express.Router();

router.get('/:id', activityController.getById);

module.exports = router;
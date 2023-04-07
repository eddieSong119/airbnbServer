const express = require('express');
const pointsController = require('../controllers/pointsController');

const router = express.Router();

router.get('/get', pointsController.getAll);

module.exports = router;
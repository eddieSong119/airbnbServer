const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/:term', searchController.getByTerm);

module.exports = router;
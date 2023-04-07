const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Get started with this API'});
});

module.exports = router;
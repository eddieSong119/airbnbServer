const express = require("express");
const webhhookController = require("../controllers/webhookController");

const router = express.Router();

router.post("/webhook", webhhookController.recordSucess);

module.exports = router;

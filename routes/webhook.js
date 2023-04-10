const express = require("express");
const webhookController = require("../controllers/webhookController");
const { verifySignature } = require("../utilities/verifySignature");

const router = express.Router();

router.post("", verifySignature, webhookController.recordSuccess);

module.exports = router;

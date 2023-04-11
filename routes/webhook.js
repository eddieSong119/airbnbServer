const express = require("express");
const webhookController = require("../controllers/webhookController");
const { verifySignature } = require("../utilities/verifySignature");

const router = express.Router();

// Applied the verifySignature middleware
// Create the Stripe event before taking handling process.
router.post("", verifySignature, webhookController.recordSuccess);

module.exports = router;

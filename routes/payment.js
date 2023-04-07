const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-session", paymentController.createSession);
// router.post('/success', paymentController.paymentSuccess);

module.exports = router;

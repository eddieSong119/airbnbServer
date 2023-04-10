const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-session", paymentController.createSession);
router.post("/success", paymentController.getNewBooking);
router.post("/check_status", paymentController.checkBookingStatus);

module.exports = router;

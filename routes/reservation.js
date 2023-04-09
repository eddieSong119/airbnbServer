const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.post("/cancel", reservationController.cancelById);

module.exports = router;

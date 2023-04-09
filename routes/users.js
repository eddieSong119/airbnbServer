const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.post("/signup", usersController.userRegister);
router.post("/login", usersController.userLogin);
router.post("/getBookings", usersController.getBookings);

module.exports = router;

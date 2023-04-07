const express = require("express");
const venuesController = require("../controllers/venuesController");

const router = express.Router();

router.get("/:feature", venuesController.getFeatured);
router.get("/city/:cityName", venuesController.getByCityName);

module.exports = router;

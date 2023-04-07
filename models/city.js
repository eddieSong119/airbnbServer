const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  cityName: { type: String, required: true, unique: false },
  image: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
  feature: { type: String, required: true, unique: false },
  recommended: { type: Boolean, required: true, unique: false },
});

const City = mongoose.model("City", citySchema, "city");

module.exports = City;

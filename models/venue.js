const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: false },
  uid: { type: Number, required: true, unique: false },
  title: { type: String, required: true, unique: false },
  location: { type: String, required: true, unique: false },
  location_discription: { type: String, required: true, unique: false },
  rating: { type: Number, required: true, unique: false },
  guests: { type: Number, required: true, unique: false },
  pricePerNight: { type: Number, required: true, unique: false },
  details: { type: String, required: true, unique: false },
  amenities: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: true, unique: false },
  points: { type: String, required: true, unique: false },
  recommended: { type: Boolean, required: true, unique: false },
  superHost: { type: Boolean, required: true, unique: false },
});

const Venue = mongoose.model("Venue", venueSchema, "venue");

module.exports = Venue;

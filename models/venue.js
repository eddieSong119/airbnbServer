const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: false },
  uid: { type: Number, required: true, unique: false },
  title: { type: String, required: true, unique: false },
  location: { type: String, required: true, unique: false },
  location_description: { type: String, required: true, unique: false },
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

venueSchema.statics.getByQuery = async (query) => {
  const venues = await Venue.find(
    query,
    "id title location location_description rating pricePerNight imageUrl -_id"
  );
  return venues;
};

venueSchema.statics.getFullDocByQuery = async (query) => {
  const venues = await Venue.find(query);
  return venues;
};

venueSchema.statics.getById = async (id) => {
  const venue = await Venue.findOne(
    id,
    "id uid title location location_description rating guests pricePerNight details amenities imageUrl points -_id"
  );
  return venue;
};

const Venue = mongoose.model("Venue", venueSchema, "venue");

module.exports = Venue;

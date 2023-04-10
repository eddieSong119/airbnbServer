const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  stripeId: { type: String, require: true, unique: false },
  status: { type: String, require: true, unique: false },
  venueData: {
    id: { type: Number, required: true, unique: false },
    uid: { type: Number, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    location: { type: String, required: true, unique: false },
    location_description: { type: String, required: true, unique: false },
    details: { type: String, required: true, unique: false },
    rating: { type: Number, required: true, unique: false },
    guests: { type: Number, required: true, unique: false },
    pricePerNight: { type: Number, required: true, unique: false },
    amenities: { type: String, required: true, unique: false },
    imageUrl: { type: String, required: true, unique: false },
    points: { type: String, required: true, unique: false },
  },
  totalPrice: { type: Number, required: true, unique: false },
  diffDays: { type: Number, required: true, unique: false },
  pricePerNight: { type: Number, required: true, unique: false },
  checkIn: { type: Date, required: true, unique: false },
  checkOut: { type: Date, required: true, unique: false },
  userEmail: { type: String, required: true, unique: false },
  numberOfGuests: { type: Number, required: true, unique: false },
  currency: { type: String, required: true, unique: false },
});

const Booking = mongoose.model("Booking", bookingSchema, "booking");

module.exports = Booking;

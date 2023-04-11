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

bookingSchema.statics.getByQuery = async (query) => {
  const bookings = await Booking.find(query);
  return bookings;
};

bookingSchema.statics.getOneByQuery = async (query) => {
  const booking = await Booking.findOne(query);
  return booking;
};

bookingSchema.statics.getById = async (Id) => {
  const booking = await Booking.findById(Id, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`document is ${doc}`);
    }
  });
  return booking;
};

bookingSchema.statics.cancelById = async (Id, userEmail) => {
  const bookingToCancel = await Booking.findOne(Id, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(404).json({ msg: "noSuchBooking" });
    } else {
      console.log(doc);
    }
  });
  if (bookingToCancel.userEmail === userEmail) {
    bookingToCancel.status = "cancelled";
    const cancelledBooking = await bookingToCancel.save();
    return cancelledBooking;
  } else {
    throw new Error(
      `Booking not belongs to this user, the userEmail is ${userEmail}, but the booking belongs to ${bookingToCancel.userEmail}`
    );
  }
};

bookingSchema.statics.createBooking = async (userData) => {
  try {
    const newBooking = new Booking(userData);
    const savedBooking = await newBooking.save();
    return savedBooking;
  } catch (err) {
    throw err;
  }
};

const Booking = mongoose.model("Booking", bookingSchema, "booking");

module.exports = Booking;

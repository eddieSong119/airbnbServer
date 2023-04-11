const Booking = require("../models/booking");
const { decodeToken } = require("../utilities/authentication");

exports.cancelById = async (req, res) => {
  const { token, bookingId } = req.body;
  const userEmail = decodeToken(token).id;
  try {
    await Booking.cancelById(bookingId, userEmail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${err}` });
  }
};

const Booking = require("../models/booking");
const { verifyToken } = require("../utilities/authentication");

exports.cancelById = async (req, res) => {
  const { token, bookingId } = req.body;
  const userEmail = verifyToken(token).id;
  try {
    const bookingToCancel = await Booking.findOne({ id: bookingId });
    if (bookingToCancel.userEmail === userEmail) {
      bookingToCancel.status = "cancelled";
      const updatedBooking = await bookingToCancel.save();
      res.status(200).json({ msg: "cancelled", updatedBooking });
    } else {
      throw new Error("Booking not belongs to this user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${err}` });
  }
};

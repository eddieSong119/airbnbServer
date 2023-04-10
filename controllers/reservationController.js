const Booking = require("../models/booking");
const { verifyToken } = require("../utilities/authentication");

exports.cancelById = async (req, res) => {
  const { token, bookingId } = req.body;
  const userEmail = verifyToken(token).id;
  try {
    const bookingToCancel = await Booking.findById(bookingId, (err, doc) => {
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
      res.status(200).json({ msg: "cancelled", cancelledBooking });
    } else {
      throw new Error(
        `Booking not belongs to this user, the userEmail is ${userEmail}, but the booking belongs to ${bookingToCancel.userEmail}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${err}` });
  }
};

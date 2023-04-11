const Booking = require("../models/booking");

// This function is for changing the status from 'unpaid' to 'confirmed' after receiving the
// payment success request from Stripe webhook.
exports.recordSuccess = async (req, res) => {
  const { eventType } = req;
  const session = req.body;

  if (eventType === "checkout.session.completed") {
    const sessionId = session.id;
    const { recordId } = session.metadata;
    const unpaidBooking = await Booking.getById(recordId);
    unpaidBooking.status = "confirmed";
    unpaidBooking.stripeId = sessionId;
    await unpaidBooking.save();
    res.status(200).send("Webhook received");
  } else {
    res.status(400).send("Webhook received but type error");
  }
};

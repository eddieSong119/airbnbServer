const Booking = require("../models/booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");

exports.recordSuccess = async (req, res) => {
  const { eventType } = req;
  console.log(`in controller, type is ${eventType}`);
  console.log(`req is ${req}`);
  const session = req.body;

  if (eventType === "checkout.session.completed") {
    console.log(`in controller passed the if check`);
    const sessionId = session.id;
    const { recordId } = session.metadata;
    console.log(`recordId is: ${recordId}`);
    // const objectId = new mongoose.Types.ObjectId(recordId);
    // console.log(`record objectID is ${objectId}`);
    const unpaidBooking = await Booking.findById(recordId, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(`document is : ${doc}`);
      }
    });
    console.log(`unpaidbooking id is: ${unpaidBooking._id}`);
    unpaidBooking.status = "confirmed";
    unpaidBooking.stripeId = sessionId;
    await unpaidBooking.save();
    res.status(200).send("Webhook received");
  } else {
    res.status(400).send("Webhook received but type error");
  }
};

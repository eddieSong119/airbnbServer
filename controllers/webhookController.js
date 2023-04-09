const Booking = require("../models/booking");

exports.recordSucess = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const endpointSecretKey = process.env.JWT_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecretKey
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionId = session.id;
    const { venueDataString, ...restBookingData } = session.metadata;
    const venueData = JSON.parse(venueDataString);
    const bookingData = { venueData, ...restBookingData };
    // const bookingData = session.metadata;
    const newBooking = new Booking({
      id: sessionId,
      status: "confirmed",
      ...bookingData,
    });
    await newBooking.save();
  }
  res.status(200).send("Webhook received");
};

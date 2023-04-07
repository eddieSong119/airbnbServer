const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createSession = async (req, res) => {
  try {
    const {
      venueData,
      totalPrice,
      diffDays,
      pricePerNight,
      checkIn,
      checkOut,
      token,
      numberOfGuest,
      currency,
    } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: totalPrice,

        }
      ],
      mode: "payment",
      success_url: "http://localhost:3000/payment-success"
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

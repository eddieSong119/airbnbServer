const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/booking");
const User = require("../models/users");
const { decodeToken, verifyToken } = require("../utilities/authentication");

exports.createSession = async (req, res) => {
  try {
    //derive required data from request
    const {
      venueData,
      totalPrice,
      diffDays,
      pricePerNight,
      checkIn,
      checkOut,
      token,
      numberOfGuests,
      currency,
    } = req.body;
    const userEmail = verifyToken(token).id;
    const unpaidBooking = await Booking.createBooking({
      stripeId: "",
      status: "unpaid",
      venueData,
      totalPrice,
      diffDays,
      pricePerNight,
      checkIn,
      checkOut,
      userEmail,
      numberOfGuests,
      currency,
    });
    const recordId = unpaidBooking._id.toString();
    // create session to the stripe checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: venueData.title,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://airbnb-clone.eddiezihaosong.com/payment-success/{CHECKOUT_SESSION_ID}`,
      cancel_url: "https://airbnb-clone.eddiezihaosong.com",
      metadata: {
        recordId,
      },
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "missingData", err });
  }
};

// This function is used when website turns to payment-success page,
// and fetch the information of the just paid booking
exports.getNewBooking = async (req, res) => {
  const { stripeToken, token } = req.body;
  const userEmail = decodeToken(token).id;
  try {
    const booking = await Booking.getOneByQuery({ stripeId: stripeToken });
    if (booking.userEmail === userEmail) {
      const userData = await User.getByQuery({ email: userEmail });
      res.status(200).json({ reservationDetails: booking, userData });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "noMatchBooking" });
  }
};

// This function is used for when loading payment-success page, the website will send polling requests
// to check if booking document in database has been modified after the server received the webhook request from Stripe
exports.checkBookingStatus = async (req, res) => {
  const seeBody = req.body;
  const bookingId = req.body.stripeToken;
  try {
    const booking = await Booking.getOneByQuery({ stripeId: bookingId });
    res.status(200).json({ status: booking.status });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "serverError", seeBody, bookingId });
  }
};

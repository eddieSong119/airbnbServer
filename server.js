const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./routes/index");
const citiesRouter = require("./routes/cities");
const activitiesRouter = require("./routes/activities");
const venuesRouter = require("./routes/venues");
const cityRouter = require("./routes/city");
const venueRouter = require("./routes/venue");
const activityRouter = require("./routes/activity");
const pointsRouter = require("./routes/points");
const searchRoute = require("./routes/search");
const usersRoute = require("./routes/users");
const paymentRoute = require("./routes/payment");
const stripeWebhookRoute = require("./routes/webhook");
const webhhookController = require("./controllers/webhookController");
const reservationRoute = require("./routes/reservation");
const Booking = require("./models/booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());

// resolve request body into JSON, and define verify middleware for keeping raw request body for Stripe event construction
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// Connect to your MongoDB database using Mongoose
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
    // List all collections in the database
    // removed the collection output
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  })
  .catch((err) => console.error(err));

app.use("/", indexRouter);
app.use("/cities", citiesRouter);
app.use("/activities", activitiesRouter);
app.use("/venues", venuesRouter);
app.use("/city", cityRouter);
app.use("/venue", venueRouter);
app.use("/activity", activityRouter);
app.use("/points", pointsRouter);
app.use("/search", searchRoute);
app.use("/users", usersRoute);
app.use("/payment", paymentRoute);
app.use("/stripe_webhooks", stripeWebhookRoute);
app.use("/reservation", reservationRoute);

// Start the server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

module.exports = mongoose;

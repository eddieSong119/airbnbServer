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
const reservationRoute = require("./routes/reservation");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to your MongoDB database using Mongoose
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
    // List all collections in the database
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
app.use("/webhook", stripeWebhookRoute);
app.use("/reservation", reservationRoute);

// Start the server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

module.exports = mongoose;

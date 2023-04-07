const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  activityType: { type: String, required: true, unique: false },
  title: { type: String, required: true, unique: false },
  cost: { type: Number, required: true, unique: false },
  rating: { type: Number, required: true, unique: false },
  totalRatings: { type: Number, required: true, unique: false },
  description: { type: String, required: true, unique: false },
  duration: { type: String, required: true, unique: false },
  groupSize: { type: Number, required: true, unique: false },
  image: { type: String, required: true, unique: false },
});

const Activity = mongoose.model("Activity", activitySchema, "activity");

module.exports = Activity;

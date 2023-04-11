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

activitySchema.statics.getByQuery = async (query) => {
  const activities = await Activity.find(
    query,
    "id activityType title cost rating totalRatings image -_id"
  );
  return activities;
};

activitySchema.statics.getFullDocByQuery = async (query) => {
  const activities = await Activity.find(query);
  return activities;
};

activitySchema.statics.getById = async (id) => {
  const activity = await Activity.findOne(id, "-_id");
  return activity;
};

const Activity = mongoose.model("Activity", activitySchema, "activity");

module.exports = Activity;

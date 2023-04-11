const mongoose = require("mongoose");

const pointsSchema = new mongoose.Schema({
  pointTitle: { type: String, required: true },
  text: { type: String, required: true },
});

pointsSchema.statics.getByQuery = async (query) => {
  const points = await Points.find(query);
  return points;
};

const Points = mongoose.model("Points", pointsSchema, "points");

module.exports = Points;

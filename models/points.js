const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
    pointTitle: { type: String, required: true },
    text: { type: String, required: true }
});

const Points = mongoose.model("Points", pointsSchema, 'points');

module.exports = Points;
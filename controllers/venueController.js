const Venue = require("../models/venue");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const venue = await Venue.getById({ id: { $eq: id } });
    res.json(venue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

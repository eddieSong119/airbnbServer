const Venue = require("../models/venue");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const venue = await Venue.findOne(
      { id: { $eq: id } },
      "id uid title location location_description rating guests pricePerNight details amenities imageUrl points -_id"
    );
    res.json(venue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

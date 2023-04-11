const Venue = require("../models/venue");
const City = require("../models/city");
const Activity = require("../models/activity");

exports.getByTerm = async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const cityResults = await City.getFullDocByQuery({
      cityName: { $regex: searchTerm, $options: "i" },
    });
    const venueResults = await Venue.getFullDocByQuery({
      title: { $regex: searchTerm, $options: "i" },
      details: { $regex: searchTerm, $options: "i" },
      location: { $regex: searchTerm, $options: "i" },
    });
    const activityResults = await Activity.getFullDocByQuery({
      description: { $regex: searchTerm, $options: "i" },
      description: { $regex: searchTerm, $options: "i" },
    });
    const searchResult = {
      venues: venueResults,
      cities: cityResults,
      activities: activityResults,
    };
    res.json(searchResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

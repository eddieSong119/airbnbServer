const Venue = require("../models/venue");
const City = require("../models/city");
const Activity = require("../models/activity");

exports.getByTerm = async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const cityResults = await City.find(
      {
        cityName: { $regex: searchTerm, $options: "i" },
      },
      (err, city) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const venueResults = await Venue.find(
      {
        title: { $regex: searchTerm, $options: "i" },
        details: { $regex: searchTerm, $options: "i" },
        location: { $regex: searchTerm, $options: "i" },
      },
      (err, venue) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const activityResults = await Activity.find(
      {
        description: { $regex: searchTerm, $options: "i" },
        description: { $regex: searchTerm, $options: "i" },
      },
      (err, activity) => {
        if (err) {
          console.log(err);
        }
      }
    );
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

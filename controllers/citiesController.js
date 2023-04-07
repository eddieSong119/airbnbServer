const City = require("../models/city");

exports.getFeatured = async (req, res) => {
  try {
    const feature = req.params.feature;
    if (feature === "recommended") {
      const cities = await City.find(
        { recommended: true },
        "id cityName image price feature -_id"
      );
      res.json(cities);
    } else {
      const cities = await City.find(
        { feature },
        "id cityName image price feature -_id"
      );
      let header;
      switch (feature) {
        case "exotic":
          header = "Visit a new and exciting city";
          break;
        case "europe":
          header = "Take a city break in Europe";
          break;
        case "asia":
          header = "Explore a new city in Asia";
          break;
        case "us":
          header = "Experience the US";
          break;
        case "beach":
          header = "Head to the beach";
          break;
        default:
          header = "";
      }
      const response = { header, cities };
      res.json(response);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

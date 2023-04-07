const Activity = require("../models/activity");

exports.getFeatured = async (req, res) => {
  try {
    const feature = req.params.feature;
    if (feature === "today") {
      const activities = await Activity.find(
        {},
        "id activityType title cost rating totalRatings image -_id"
      ).limit(6);
      res.json(activities);
    } else {
      const activities = await Activity.find(
        {
          activityType: feature.toUpperCase(),
        },
        "id activityType title cost rating totalRatings image -_id"
      );
      res.json(activities);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

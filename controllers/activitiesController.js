const Activity = require("../models/activity");

exports.getFeatured = async (req, res) => {
  try {
    const feature = req.params.feature;
    if (feature === "today") {
      // Mocking we have the "today" feature
      // Actually we don't
      const allActivities = await Activity.getByQuery({});
      const activities = allActivities.slice(0, 6);
      res.json(activities);
    } else {
      const activities = await Activity.getByQuery({
        activityType: feature.toUpperCase(),
      });
      res.json(activities);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

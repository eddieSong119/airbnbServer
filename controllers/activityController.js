const Activity = require("../models/activity");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const activity = await Activity.findOne({ id: { $eq: id } }, "-_id");
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

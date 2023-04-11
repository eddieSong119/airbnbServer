const City = require("../models/city");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const city = await City.getById({ id: { $eq: id } });
    res.json(city);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

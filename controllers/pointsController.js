const Points = require('../models/points');

exports.getAll = async (req, res) => {
    try {
        const points = await Points.find();
        res.json(points);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}
  
const City = require('../models/city');

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const city = await City.find({ id: {$eq : id }});
        res.json(city[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  cityName: { type: String, required: true, unique: false },
  image: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
  feature: { type: String, required: true, unique: false },
  recommended: { type: Boolean, required: true, unique: false },
});

citySchema.statics.getByQuery = async (query) => {
  const cities = await City.find(query, "id cityName image price feature -_id");
  return cities;
};

citySchema.statics.getFullDocByQuery = async (query) => {
  const cities = await City.find(query);
  return cities;
};

citySchema.statics.getById = async (id) => {
  const city = await City.findOne(id);
  return city;
};

const City = mongoose.model("City", citySchema, "city");

module.exports = City;

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
});

usersSchema.statics.getByQuery = async (query) => {
  const userData = Users.findOne(query, "email -_id");
  return userData;
};

usersSchema.statics.getByQueryWithPass = async (query) => {
  const userData = Users.findOne(query);
  return userData;
};

usersSchema.statics.createUser = async (userData) => {
  try {
    const newUser = new Users(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

const Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;

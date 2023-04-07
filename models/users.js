const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
});

const Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;

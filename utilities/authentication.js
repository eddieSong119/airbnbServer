const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Needed authentication functions for JWT.
const generateToken = (user) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// In case the token is expired, this function only decode for its info
const decodeToken = (token) => {
  console.log(`token is ${token}`);
  console.log(`decodedTokenIs: ${jwt.decode(token)}`);
  return jwt.decode(token);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  hashPassword,
  comparePassword,
};

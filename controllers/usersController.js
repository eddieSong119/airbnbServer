const Users = require("../models/users");
const Booking = require("../models/booking");
const {
  verifyToken,
  hashPassword,
  generateToken,
  comparePassword,
} = require("../utilities/authentication");

exports.userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if the request data is valid
    if (email === "" || password === "") {
      return res.json({ msg: "invalidData" });
    }
    // check if the user is existed
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "userExists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new Users({ email, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({ msg: "userAdded", email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.json({ msg: "noEmail" });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.json({ msg: "badPass" });
    }
    const token = generateToken(user);
    res.status(200).json({ msg: "loggedIn", token, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookings = async (req, res) => {
  const { token } = req.body;
  const userEmail = verifyToken(token).id;
  try {
    const bookings = await Booking.find({ userEmail });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

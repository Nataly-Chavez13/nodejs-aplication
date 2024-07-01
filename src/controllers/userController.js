const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { nombre, edad, email, password } = req.body;
  try {
    const user = new User({ nombre, edad, email, password });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Unable to login");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

const logout = async (req, res) => {
  try {
    req.token = null; // Invalidar el token
    res.send("Logged out successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { register, login, logout, getAllUsers };

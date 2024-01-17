const mongoose = require("mongoose");

const User = mongoose.Schema({
  userName: String,
  phone: String,
  email: String,
  password: String,
  date: String,
  role: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  avatar: String,
  location: String,
  gender: Array,
});

module.exports = mongoose.model("User", User);

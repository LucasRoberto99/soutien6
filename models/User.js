const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  token: String,
  description: String,
  hash: String,
  salt: String,
});

module.exports = User;

const express = require("express");

const router = express.Router();

// import pour mdp

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  console.log("route =>", "/user/signup");
  console.log(req.body);
  try {
    // destructuring pour éviter de faire req.body.username ou req.body.password à chaque fois !

    const { username, password, email, description } = req.body;

    // vérification de BASE (pas suffisant du tout)

    if (username && password && email && description) {
      const userEmail = await User.findOne({ email: email });
      const userName = await User.findOne({ username: username });

      if (userEmail) {
        return res.status(409).json({ message: "email already in db" });
      }

      if (userName) {
        return res.status(409).json({ message: "user already in db" });
      }

      // gestion du mdp !
      const salt = uid2(16);
      const token = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      //

      const newUser = new User({
        username: username,
        email: email,
        description: description,
        hash: hash,
        salt: salt,
        token: token,
      });

      // je sauvegarde le User que je viens de créer
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        description: newUser.description,
        token: token,
      });
    } else {
      res.status(400).json({ message: "missing parameters" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

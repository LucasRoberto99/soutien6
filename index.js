require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// import de mes routes

const userRoutes = require("./routes/user");

// utilisation de mes routes

app.use(userRoutes);

app.get("/", (req, res) => {
  console.log("hey");
  res.status(200).json({ message: "Bienvenue" });
});

// ici je peux mettre toute mes routes si je ne veux pas split

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("server started 😁");
});

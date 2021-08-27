require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Solve = require("./models/solve");

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the homepage.");
});

app.get("/api", (req, res) => {
  Solve.find({}).then((solves) => {
    console.log(solves);
    res.json(solves);
  });
});

app.get("/api/solves/fastestTen", (req, res) => {
  res.send([
    { name: "kyle", time: "54" },
    { name: "david", time: "2" },
  ]);
});

app.get("/api/solves/:id", (req, res) => {
  res.send(req.params.id + `'s Stats`);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

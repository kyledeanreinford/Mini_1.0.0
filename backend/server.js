require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("This is the homepage.");
});

app.get("/api", (req, res) => {
  res.send("This is the API");
});

app.get("/api/solves/fastestTen", (req, res) => {
  res.send([
    { name: "kyle", time: "54" },
    { name: "david", time: "2" },
  ]);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

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

app.get("/api/solves/:name", (req, res) => {
  console.log(req.params.name);
  Solve.find({ name: req.params.name }).then((solves) => {
    console.log(solves);
    res.json(solves);
  });
});

app.get("/api/solves/:name/fastest", (req, res) => {
  Solve.find({ name: req.params.name }).then((solves) => {
    const participated = solves.filter((solve) => solve.time !== "--");
    const totalSolveTime = participated.reduce((a, b) => {
      return a + Number(b.time);
    }, 0);
    const average = totalSolveTime / participated.length;
    participated.sort((a, b) => a.time - b.time);
    const fastest = participated.slice(0, 5);
    res.send({ average, fastest });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

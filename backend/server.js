require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Solve = require("./models/solve");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(express.static("../frontend/build"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the homepage.");
});

app.get("/api", (req, res) => {
  Solve.find({}).then((solves) => {
    res.json(solves);
  });
});

app.get("/api/solves/fastestTen", (req, res) => {
  Solve.find({}).then((solves) => {
    const participated = solves.filter((solve) => solve.time !== "--");
    participated.sort((a, b) => a.time - b.time);
    const fastestTen = participated.slice(0, 10);
    res.send(fastestTen);
  });
});

app.get("/api/solves/:name", (req, res) => {
  console.log(req.params.name);
  Solve.find({ name: req.params.name }).then((solves) => {
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
    const worst = participated.slice(-1)[0];
    res.send({ average, fastest, worst });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Solve = require("./models/solve");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(express.static("backend/build"));

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

app.get("/api/solves/", (req, res) => {
  Solve.find({}).then((solves) => {
    const participated = solves.filter((solve) => solve.time !== "--");
    const parsed = participated.map((solve) => ({
      name: solve.name,
      time: Number(solve.time),
      date: solve.date,
    }));

    const reduced = parsed.reduce((obj, solve) => {
      let date = solve.date;
      if (!obj.hasOwnProperty(date)) {
        obj[date] = [];
      }
      obj[date].push(solve);
      return obj;
    }, {});
    res.json(reduced);
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
  console.log("api request for", req.params.name);
  Solve.find({ name: req.params.name }).then((solves) => {
    res.json(solves);
  });
});

app.get("/api/lastSevenDays", (req, res) => {
  const date = new Date();
  const last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  let day = last.getDate();
  let month = last.getMonth() + 1;
  const year = last.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const sp = "-";
  const lastWeek = year + sp + month + sp + day;
  Solve.find({ date: { $gte: lastWeek } }).then((solves) => {
    res.json(solves);
  });
});

app.get("/api/yesterday", (req, res) => {
  const date = new Date();
  const last = new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000);
  let day = last.getDate();
  let month = last.getMonth() + 1;
  const year = last.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const sp = "-";
  const yesterday = year + sp + month + sp + day;
  Solve.find({ date: yesterday }).then((solves) => {
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
    res.send({ average, fastest, worst, participated });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

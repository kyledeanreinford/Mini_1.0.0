const axios = require("axios");

const fastestTen = () => {
  const req = axios.get("/api/solves/fastestTen");
  return req
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const fetchPlayer = (playerName) => {
  const req = axios.get(`/api/solves/${playerName}`);
  return req
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchPlayerFastest = (playerName) => {
  const req = axios.get(`/api/solves/${playerName}/fastest`);
  return req
    .then((res) => {
      const average = res.data.average;
      const fastest = res.data.fastest;
      const worst = res.data.worst.time;
      return { fastest, average, worst };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default { fastestTen, fetchPlayer, fetchPlayerFastest };

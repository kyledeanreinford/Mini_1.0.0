import React, { useState, useEffect } from "react";
import "./App.css";
import solveService from "./components/services/solves";
import PlayerButton from "./components/PlayerButton";
import PlayerFastest from "./components/PlayerFastest";

function App() {
  const [fastestTen, setFastestTen] = useState([]);
  const [winnerList, setWinnerList] = useState([]);
  const [allByDate, setAllByDate] = useState([]);
  const [currentPlayerSolves, setCurrentPlayerSolves] = useState([]);
  const [currentPlayerName, setCurrentPlayerName] = useState();
  const [currentPlayerFastest, setCurrentPlayerFastest] = useState([]);
  const [average, setAverage] = useState();
  const [worst, setWorst] = useState();
  const players = [
    { name: "Kyle", alias: "kyledeanreinford" },
    { name: "Jeffrey", alias: "jalopey" },
    { name: "Ted", alias: "The Nuge" },
    { name: "Dane", alias: "d’Anthony" },
    { name: "Conor", alias: "conor" },
    { name: "David", alias: "Szakonyi" },
    { name: "Mark", alias: "Mark Miller" },
    { name: "Will", alias: "willardsmith" },
    { name: "Eric", alias: "Ericki" },
  ];

  const handleClick = (e) => {
    console.log(e.target.id);
    solveService.fetchPlayer(e.target.id).then((res) => {
      setCurrentPlayerSolves(res);
      setCurrentPlayerName(e.target.id);
    });
    solveService.fetchPlayerFastest(e.target.id).then((res) => {
      setCurrentPlayerFastest(res.fastest);
      setAverage(res.average.toFixed(2));
      setWorst(res.worst);
    });
  };

  useEffect(() => {
    solveService.fastestTen().then((res) => {
      setFastestTen(res);
    });
    solveService.getAllByDate().then((res) => {
      let winners = [];
      Object.entries(res).forEach(([key, value]) => {
        value.sort((a, b) => a.time - b.time);
        if (value[0].time !== value[1].time) {
          winners.push(value[0].name);
        }
      });
      const count = winners.reduce((tally, player) => {
        tally[player] = (tally[player] || 0) + 1;
        return tally;
      }, {});
      setWinnerList(count);
    });
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <h1>
          <a href="/  ">New York Times Mini Leaderboard</a>
        </h1>
      </div>
      <div className="nav">
        <ul>
          {players.map((player) => {
            return (
              <li key={player.name}>
                <PlayerButton
                  className="btn"
                  player={player}
                  handleClick={handleClick}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="main">
        {currentPlayerName && (
          <PlayerFastest
            name={currentPlayerName}
            solves={currentPlayerFastest}
            average={average}
            worst={worst}
          />
        )}
        {fastestTen && !currentPlayerName && (
          <div>
            <h2>Top 10 Times</h2>
            {fastestTen.map((solve, index) => {
              return (
                <li key={index}>
                  {solve.name}: {solve.time} seconds
                </li>
              );
            })}
          </div>
        )}
        {Object.keys(winnerList).length !== 0 && (
          <div>
            <h2>Total Wins:</h2>
            <ul>
              {Object.entries(winnerList).map(([key, value]) => {
                return (
                  <li key={key}>
                    {key}:{value}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="footer">
        Made by{" "}
        <a href="https://github.com/kyledeanreinford">Kyle Dean Reinford</a> |
        Mediocre Coder 2021
      </div>
    </div>
  );
}

export default App;

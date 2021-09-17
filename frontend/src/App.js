import React, { useState, useEffect } from "react";
import "./App.css";
import solveService from "./components/services/solves";
import PlayerButton from "./components/PlayerButton";
import PlayerFastest from "./components/PlayerFastest";
import TotalWins from "./components/TotalWins";
import DropdownMenu from "./components/DropdownMenu";
import LastSeven from "./components/LastSeven";
import Yesterday from "./components/Yesterday";

function App() {
  const [fastestTen, setFastestTen] = useState([]);
  const [lastSeven, setLastSeven] = useState([]);
  const [best, setBest] = useState(null);
  const [worst, setWorst] = useState(null);
  const [winnerList, setWinnerList] = useState([]);
  const [allByDate, setAllByDate] = useState([]);
  const [currentPlayerSolves, setCurrentPlayerSolves] = useState([]);
  const [currentPlayerName, setCurrentPlayerName] = useState();
  const [currentPlayerFastest, setCurrentPlayerFastest] = useState([]);
  const [average, setAverage] = useState();
  const [participated, setParticipated] = useState([]);
  const [wins, setWins] = useState();
  const [winPercentage, setWinPercentage] = useState();
  const [participatedLength, setParticipatedLength] = useState();
  const [maxY, setMaxY] = useState("");
  const [minY, setMinY] = useState("");
  const [userWorst, setUserWorst] = useState();
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
      setParticipatedLength(0);
      setWinPercentage(0);
      setCurrentPlayerFastest(res.fastest);
      setAverage(res.average.toFixed(2));
      setParticipated(res.participated);
      setUserWorst(res.worst);
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
    solveService.lastSevenDays().then((res) => {
      const filtered = res.filter((solve) => solve.time !== "--");

      setMaxY(
        filtered.reduce((prev, current) =>
          Number(prev.time) > Number(current.time) ? prev : current
        ).time
      );
      setMinY(
        filtered.reduce((prev, current) =>
          Number(prev.time) < Number(current.time) ? prev : current
        ).time
      );
      setLastSeven(filtered);
    });
    solveService.getYesterday().then((res) => {
      setBest([...res].sort((a, b) => a.time - b.time));
      setWorst([...res].sort((a, b) => b.time - a.time).slice(0, 1));
    });
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <h1>
          <a href="/  ">New York Times Mini Leaderboard</a>
        </h1>
      </div>
      <DropdownMenu players={players} handleClick={handleClick} />
      <div className="main">
        {currentPlayerName && (
          <PlayerFastest
            name={currentPlayerName}
            solves={currentPlayerFastest}
            average={average}
            worst={userWorst}
            participated={participated}
            winnerList={winnerList}
            wins={wins}
            setWins={setWins}
            winPercentage={winPercentage}
            setWinPercentage={setWinPercentage}
            players={players}
            setParticipatedLength={setParticipatedLength}
            participatedLength={participatedLength}
          />
        )}
        {/* <Yesterday best={best} worst={worst} /> */}
        <LastSeven lastSeven={lastSeven} minY={minY} maxY={maxY} />
        {fastestTen && !currentPlayerName && (
          <div>
            <h2>Top 10 All Time Solves</h2>
            {fastestTen.map((solve, index) => {
              return (
                <li className="solve" key={index}>
                  {solve.name}: {solve.time} seconds
                </li>
              );
            })}
            <br />
            <br />
          </div>
        )}
        {/* 
        {Object.keys(winnerList).length > 1 && (
          <TotalWins
            className="total-wins"
            players={players}
            winnerList={winnerList}
          />
        )} */}
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

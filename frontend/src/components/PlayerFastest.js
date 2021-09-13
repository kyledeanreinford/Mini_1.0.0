import React, { useEffect } from "react";

const PlayerFastest = ({
  name,
  solves,
  average,
  worst,
  participated,
  winnerList,
  wins,
  setWins,
  winPercentage,
  setWinPercentage,
  players,
  setParticipatedLength,
  participatedLength,
}) => {
  useEffect(() => {
    setWins(0);
    setWinPercentage(0);
    Object.entries(winnerList).some(([key, value]) => {
      setParticipatedLength(Object.keys(participated).length);
      if (key === name) {
        setWins(value);
        setWinPercentage(((value / participatedLength) * 100).toFixed(2));
      }
    });
  });

  let displayName = "";
  switch (name) {
    case "kyledeanreinford":
      displayName = "Kyle";
      break;
    case "jalopey":
      displayName = "Jeffrey";
      break;
    case "d’Anthony":
      displayName = "Dane";
      break;
    case "Ericki":
      displayName = "Eric";
      break;
    case "willardsmith":
      displayName = "Will";
      break;
    case "Mark Miller":
      displayName = "Mark";
      break;
    case "The Nuge":
      displayName = "Ted";
      break;
    case "conor":
      displayName = "Conor";
      break;
    case "Szakonyi":
      displayName = "David";
      break;
    default:
      displayName = "Nobody selected";
  }

  return (
    <div>
      <h2>{displayName}</h2>
      <br />
      <h4>Best Times</h4>
      {solves.map((solve) => {
        return (
          <li className="solve" key={solve.id}>
            {solve.time} seconds on {solve.date}
          </li>
        );
      })}
      <br />
      <p>Average solve time: {average} seconds.</p>
      <br />
      <p>
        Wins: {wins} (out of {participatedLength})
      </p>
      <br />
      <p>Win Percentage: {winPercentage}%</p>
      <br />
      <p>Worst time is {worst} seconds &#129313;</p>
    </div>
  );
};

export default PlayerFastest;

import React from "react";

const PlayerFastest = ({ name, solves, average, worst }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h3>Best Times</h3>
      {solves.map((solve) => {
        return (
          <li key={solve.id}>
            {solve.time} seconds on {solve.date}
          </li>
        );
      })}
      <br />
      <p>Average solve time: {average} seconds.</p>
      <br />
      <p>Worst time is {worst} seconds &#129313;</p>
    </div>
  );
};

export default PlayerFastest;

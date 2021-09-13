import React from "react";

const PlayerButton = ({ className, handleClick, player }) => {
  return (
    <li>
      <button className={className} onClick={handleClick} id={player.alias}>
        {player.name}
      </button>
    </li>
  );
};

export default PlayerButton;

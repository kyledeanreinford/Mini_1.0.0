import React from "react";

const PlayerButton = ({ className, handleClick, player }) => {
  return (
    <button className={className} onClick={handleClick} id={player.alias}>
      {player.name}
    </button>
  );
};

export default PlayerButton;

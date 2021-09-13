import React, { useState, useRef, useEffect } from "react";
import PlayerButton from "./PlayerButton";

const DropdownMenu = ({ players, handleClick }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  const handleMenuClick = (e) => {
    handleClick(e);
    setIsActive(!isActive);
  };

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
        <span>Players</span>
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          {players.map((player) => {
            return (
              <PlayerButton
                className="menu-button"
                player={player}
                handleClick={handleMenuClick}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;

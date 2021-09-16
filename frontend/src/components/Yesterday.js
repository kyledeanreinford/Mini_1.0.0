import React, { useState, useEffect } from "react";

const Yesterday = ({ yesterday }) => {
  const [best, setBest] = useState(null);
  const [worst, setWorst] = useState(null);

  useEffect(() => {
    setBest(yesterday.sort((a, b) => a.time - b.time).slice(0, 1));
    setWorst(yesterday.sort((a, b) => b.time - a.time).slice(0, 1));
  }, [yesterday]);

  return (
    <>
      {best && (
        <div>
          <h2>Yesterday's Results</h2>
          <div>
            Winner: {best.map((solve) => solve.name)} in{" "}
            {best.map((solve) => solve.time)} seconds
          </div>
          <div>
            Worst: {worst.map((solve) => solve.name)} in{" "}
            {worst.map((solve) => solve.time)} seconds
          </div>
        </div>
      )}
    </>
  );
};

export default Yesterday;

import React, { useState, useEffect } from "react";

const Yesterday = ({ best, worst }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setShowResults(true);
    console.log("ran");
  }, [best]);
  return (
    <>
      {showResults === true && (
        <div>
          <h2>Yesterday's Results</h2>
          {best[0].time === best[1].time ? (
            <div>It was a tie. We all lost. But the worst was...</div>
          ) : (
            <div>
              Winner: {best[0].name} in {best[0].time} seconds
            </div>
          )}
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

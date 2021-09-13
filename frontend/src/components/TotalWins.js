import React from "react";
import { RadialChart } from "react-vis";

const TotalWins = ({ winnerList, className, players }) => {
  const chartData = Object.entries(winnerList).map(([key, value]) => {
    return { angle: value, label: `${key}: ${value}` };
  });

  chartData.sort((a, b) => b.angle - a.angle);

  return (
    <div className={className}>
      <h2>Total Wins:</h2>
      <RadialChart
        data={chartData}
        showLabels={true}
        colorRange={[
          "#7592d1",
          "#5f7bb8",
          "#446cc2",
          "#6887ca",
          "#3c5da6",
          "#334e89",
          "#2a3f6c",
          "#1e2c48",
          "#1d2534",
        ]}
        height={600}
        width={600}
      />
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
  );
};

export default TotalWins;

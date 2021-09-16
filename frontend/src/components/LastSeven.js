import React, { useEffect, useState, useLayoutEffect } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const LastSeven = ({ lastSeven, maxY, minY }) => {
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const grouped = lastSeven.reduce((r, a) => {
      r[a.name] = [...(r[a.name] || []), a];
      return r;
    }, {});
    console.log(grouped);
    setData(
      Object.entries(grouped).map((player) => {
        return {
          id: player[0],
          data: player[1].map((solve) => {
            return { y: solve.time, x: solve.date };
          }),
        };
      })
    );
    setDataReady(true);
  }, [lastSeven]);

  return (
    <div className="graph">
      {dataReady === true && (
        <div style={{ height: 500 }}>
          <h2>Last 7 Days</h2>
          <ResponsiveScatterPlot
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
              type: "time",
              format: "%Y-%m-%d",
              useUTC: false,
              precision: "day",
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
              type: "linear",
              min: 0,
              max: Number(maxY) + 5,
            }}
            yFormat={function (e) {
              return e + " seconds";
            }}
            indexBy="date"
            axisTop={null}
            axisRight={null}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "solve time",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            axisBottom={{
              format: "%b %d",
              tickSize: 5,
              tickValues: "every day",
            }}
          />

          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default LastSeven;

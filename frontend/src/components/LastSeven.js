import React, { useEffect, useState, useLayoutEffect } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  DiscreteColorLegend,
  ContinuousColorLegend,
} from "react-vis";

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

const LastSeven = ({ lastSeven }) => {
  const [width, height] = useWindowSize();
  const [sevenLoaded, setSevenLoaded] = useState(false);
  const [kyle, setKyle] = useState([]);
  const [david, setDavid] = useState([]);
  const [mark, setMark] = useState([]);
  const [ted, setTed] = useState([]);
  const [dane, setDane] = useState([]);
  const [will, setWill] = useState([]);
  const [conor, setConor] = useState([]);
  const [jeffrey, setJeffrey] = useState([]);
  const [eric, setEric] = useState([]);

  const graphWidth = width * 0.9;

  useEffect(() => {
    setKyle(
      lastSeven
        .filter((solve) => solve.name === "kyledeanreinford")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setDavid(
      lastSeven
        .filter((solve) => solve.name === "Szakonyi")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setMark(
      lastSeven
        .filter((solve) => solve.name === "Mark Miller")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setTed(
      lastSeven
        .filter((solve) => solve.name === "The Nuge")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setDane(
      lastSeven
        .filter((solve) => solve.name === "d’Anthony")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setWill(
      lastSeven
        .filter((solve) => solve.name === "willardsmith")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setConor(
      lastSeven
        .filter((solve) => solve.name === "conor")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setJeffrey(
      lastSeven
        .filter((solve) => solve.name === "jalopey")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setEric(
      lastSeven
        .filter((solve) => solve.name === "Ericki")
        .map(({ time, date }) => ({
          x: date.slice(5),
          y: time === "--" ? 0 : Number(time),
        }))
    );
    setSevenLoaded(true);
  }, [lastSeven]);

  const items = [
    { title: "Kyle", color: "blue", strokeWidth: 5 },
    { title: "David", color: "lightblue", strokeWidth: 5 },
    { title: "Jeffrey", color: "red", strokeWidth: 5 },
    { title: "Mark", color: "green", strokeWidth: 5 },
    { title: "Dane", color: "purple", strokeWidth: 5 },
    { title: "Ted", color: "gray", strokeWidth: 5 },
    { title: "Conor", color: "black", strokeWidth: 5 },
    { title: "Will", color: "orange", strokeWidth: 5 },
    { title: "Eric", color: "lightgreen", strokeWidth: 5 },
  ];

  return (
    <div>
      {sevenLoaded === true && (
        <div className="graph">
          <h2>Last 7 Days</h2>
          <XYPlot xType="ordinal" width={graphWidth} height={600}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries className="kyle" color="blue" data={kyle} />
            <MarkSeries className="david" color="lightblue" data={david} />
            <MarkSeries className="jeffrey" color="red" data={jeffrey} />
            <MarkSeries className="mark" color="green" data={mark} />
            <MarkSeries className="dane" color="purple" data={dane} />
            <MarkSeries className="ted" color="gray" data={ted} />
            <MarkSeries className="conor" color="black" data={conor} />
            <MarkSeries className="will" color="orange" data={will} />
            <MarkSeries className="eric" color="lightgreen" data={eric} />
            <DiscreteColorLegend items={items} orientation="horizontal" />
          </XYPlot>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default LastSeven;

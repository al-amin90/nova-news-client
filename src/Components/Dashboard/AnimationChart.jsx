import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const options = {
  colors: ["#FF5537", "#276419"],
  pointSize: 10,
  animation: {
    duration: 4000,
    easing: "out",
    startup: true,
  },
  vAxis: {
    viewWindow: {
      max: -10,
      min: 100,
    },
  },
  hAxis: {
    viewWindow: {
      max: 100,
      min: -10,
    },
  },
  legend: { position: "none" },
  enableInteractivity: false,
};

const AnimationChart = () => {
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function getData() {
    return [
      ["Age", "Weight"],
      ...Array.from({ length: 16 }, () => [
        generateRandomNumber(1, 100),
        generateRandomNumber(1, 100),
      ]),
    ];
  }

  // animation chart
  const [chartData, setChartData] = useState(getData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData(getData());
    }, 900);

    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <div>
      <Chart
        chartType="ScatterChart"
        width="80%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default AnimationChart;

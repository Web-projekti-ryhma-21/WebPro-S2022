import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import globalmonthly from "./data/globalmonthly.json";
import northmonthly from "./data/northernhemispheremonthly.json";
import southmonthly from "./data/southernhemispheremonthly.json";

export default function Co2Chart(){
    Chart.register(zoomPlugin);

const glomo_data = {
    datasets: [
        {
            label: "southern hemisphere mothly ",
            data: [...southmonthly],
            borderColor: "rgb(0, 0, 255)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
            },
            pointRadius: 1,

        },
        {
            label: "northern hemisphere mothly ",
            data: [...northmonthly],
            borderColor: "rgb(0, 255, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
            },
            pointRadius: 1,

        },
        {
            label: "global mothly ",
            data: [...globalmonthly],
            borderColor: "rgb(0, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
            },
            pointRadius: 1,

        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        zoom: {
            drag: {
                enabled: true,
                backgroundColor: 'rgba(225,225,225,0.3)',
                borderColor: 'rgba(225,225,225)',
              },
            zoom: {
              wheel: {
                enabled: true,
                //modifierKey: 'ctrl',
              },
              mode: 'y',
            },
            limits: {
                y: {min: -2, max: 2},
            },
          },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "v01 plot",
      },
    },
    scales: {
      anomaly: {
        type: "linear",
        display: true,
        position: "right",
      },
    },
  };
  

  return (
    <div style={{ width: "1500px" }}>
      <h1>Visualization 01 dev</h1>
      <Line options={options} data={glomo_data} />
    </div>
  );
}

import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import co2annual from "./data/co2annually.json";
import globalmonthly from "./data/globalmonthly.json";
import globalannual from "./data/globalannual.json";
import northmonthly from "./data/northernhemispheremonthly.json";
import southmonthly from "./data/southernhemispheremonthly.json";

export default function Co2Chart(){
    Chart.register(zoomPlugin);
const coannual_data = {
    datasets: [
        {
            label: "Co2 annual ",
            data: [...co2annual],
            borderColor: "rgb(255, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "mean",
            xAxisID: "year",
            parsing: {
                xAxisKey:"year",
                yAxisKey:"mean",
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
    ],
};

const glomonthly_data = {
    datasets: [
        {
            label: "global mothly ",
            data: [...globalmonthly],
            borderColor: "rgb(0, 255, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
    ],
};

const northmonthly_data = {
    datasets: [
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
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
    ],
};

const southmonthly_data = {
    datasets: [
        {
            label: "southern hemisphere mothly ",
            data: [...southmonthly],
            borderColor: "rgb(0, 255, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
    ],
};

const gloannual_data = {
    datasets: [
        {
            label: "global annual ",
            data: [...globalannual],
            borderColor: "rgb(0, 0, 255)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
    ],
};

const glo_data = {
    datasets: [
        {
            label: "annual ",
            data: [...globalannual],
            borderColor: "rgb(0, 0, 255)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
        {
            label: "mothly ",
            data: [...globalmonthly],
            borderColor: "rgb(0, 255, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            yAxisID: "anomaly",
            xAxisID: "time",
            parsing: {
                xAxisKey:"time",
                yAxisKey:"anomaly",
                //zAxisKey:"unc",
            },
            pointRadius: 1,

        },
    ],
};

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
                //zAxisKey:"unc",
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
                //zAxisKey:"unc",
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
                //zAxisKey:"unc",
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
                y: {min: -5, max: 5},
            },
          },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Demo Co2 plot",
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
    <div style={{ width: "1000px" }}>
      <h1>LinearLineGraphDemo</h1>
      <Line options={options} data={glomo_data} />
      <Line options={options} data={coannual_data} />
      
      {/*
      <Line options={options} data={gloannual_data} />
      <Line options={options} data={glomonthly_data} />
      <Line options={options} data={glo_data} />
      */}
    </div>
  );
}

import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import globalmonthly from "./data/globalmonthly.json";
import northmonthly from "./data/northernhemispheremonthly.json";
import southmonthly from "./data/southernhemispheremonthly.json";
import globalannual from "./data/globalannual.json";
import northannual from "./data/northernhemisphereannual.json";
import southannual from "./data/southernhemisphereannual.json";
import "chartjs-adapter-luxon";

export default function Visualization01(){
    Chart.register(zoomPlugin);

    const [glMonth, setGlMonth] = useState([...globalmonthly]);
    const [noMonth, setNoMonth] = useState([...northmonthly]);
    const [soMonth, setSoMonth] = useState([...southmonthly]);
    const [glAnn, setGlAnn] = useState([...globalannual]);
    const [noAnn, setNoAnn] = useState([...northannual]);
    const [soAnn, setSoAnn] = useState([...southannual]);

const data = {
    datasets: [
      {
          label: "global annual ",
          data: [...glAnn],
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //yAxisID: "anomaly",
          //xAxisID: "time",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
          pointRadius: 1,
      },
      {
          label: "global mothly ",
          data: [...glMonth],
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //yAxisID: "anomaly",
          //xAxisID: "time",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
          pointRadius: 1,
      },
      {
          label: "northern hemisphere annual ",
          data: [...noAnn],
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //yAxisID: "anomaly",
          //xAxisID: "time",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
          pointRadius: 1,
      },
      {
          label: "northern hemisphere mothly ",
          data: [...noMonth],
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //yAxisID: "anomaly",
          //xAxisID: "time",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
          pointRadius: 1,
      },
      {
          label: "southern hemisphere annual ",
          data: [...soAnn],
          borderColor: "rgb(0, 255, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //yAxisID: "anomaly",
          //xAxisID: "time",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
          pointRadius: 1,
      },
      {
          label: "southern hemisphere mothly ",
          data: [...soMonth],
          borderColor: "rgb(0, 255, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          //yAxisID: "anomaly",
          //xAxisID: "time",
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
                      zoom: {
            wheel: {
              enabled: true,
              //modifierKey: 'ctrl',
            },
            /*drag: {
              enabled: true,
              //backgroundColor: 'rgba(225,225,225,0.3)',
              //borderColor: 'rgba(225,225,225)',
            },*/
            mode: 'xy',
          },
          limits: {
              y: {min: -2, max: 2},
              x: {min: 'original', max: 'original'},
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
        xAxis: {
          type: "time",
          time: {
            unit: "month",
          },
        },
      },
};
  

  return (
    <div style={{ width: "1500px" }}>
      <h1>Visualization 01 usestate dev</h1>
      <Line options={options} data={data} />
    </div>
  );
}

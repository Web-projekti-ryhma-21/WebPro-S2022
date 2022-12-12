import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization3n4(){
    Chart.register(zoomPlugin);
    Chart.defaults.color = '#a0a0a0';

    const [moaAnn, setMoaAnn] = useState([]);
    const [moaMonth, setMoaMonth] = useState([]);
    const [icDe081, setIcDe081] = useState([]);
    const [icDe082, setIcDe082] = useState([]);
    const [icDss, setIcDss] = useState([]);
    
    const domain = REACT_APP_API_ADDRESS
    const rest01 = 'v3annnual'
    const rest02 = 'v3monthly'
    const rest03 = 'v4ica1'
    const rest04 = 'v4ica2'
    const rest05 = 'v4ica3'
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getMoaAnn() {
        const r = await axios.get(`${domain}/${rest01}`);
        setMoaAnn(r.data);
      }
      async function getMoaMonth() {
        const r = await axios.get(`${domain}/${rest02}`);
        setMoaMonth(r.data);
      }
      async function getDe081() {
        const r = await axios.get(`${domain}/${rest03}`);
        setIcDe081(r.data);
      }
      async function getDe082() {
        const r = await axios.get(`${domain}/${rest04}`);
        setIcDe082(r.data);
      }
      async function getIcDss() {
        const r = await axios.get(`${domain}/${rest05}`);
        setIcDss(r.data);
      }
      getMoaAnn();
      getMoaMonth();
      getDe081();
      getDe082();
      getIcDss();
    }, []);



const data = {
    datasets: [
      {
          label: "Mauna Loa CO2 annual mean CO2 ppm",
          data: moaAnn,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 1)",
          parsing: {
              xAxisKey:"date",
              yAxisKey:"mean",
          },
      },
      {
          label: "Mauna Loa CO2 monthly mean CO2 ppm",
          data: moaMonth,
          borderColor: "rgb(175, 175, 175)",
          backgroundColor: "rgba(175, 175, 175, 1)",
          parsing: {
              xAxisKey:"date",
              yAxisKey:"avg",
          },
      },
      {
          label: "DE08 Ice Core CO2 ppm",
          data: icDe081,
          borderColor: "rgb(0, 0, 122)",
          backgroundColor: "rgba(0, 0, 122, 1)",
          parsing: {
              xAxisKey:"year",
              yAxisKey:"co2ppm",
          },
      },
      {
          label: "DE08-2 Ice Core CO2 ppm",
          data: icDe082,
          borderColor: "rgb(0, 122, 0)",
          backgroundColor: "rgba(0, 122, 0, 1)",
          parsing: {
              xAxisKey:"year",
              yAxisKey:"co2ppm",
          },
      },
      {
          label: "DSS Ice Core CO2 ppm",
          data: icDss,
          borderColor: "rgb(122, 0, 0)",
          backgroundColor: "rgba(122, 0, 0, 1)",
          parsing: {
              xAxisKey:"year",
              yAxisKey:"co2ppm",
          },
      },
    ],
};

const options = {
  responsive: true,
  animation: false,
  interaction:{
    mode: 'index',
    intersect: false,
  },
  plugins: {
      zoom: {
        pan:{
          enabled: true,
        },
        zoom: {
            wheel: {
              enabled: true,
            },
            drag: {
              enabled: true,
              modifierKey: 'ctrl',
              treshold: 31540000000*5,
            },
            mode: 'xy',
          },
          limits: {
              y: {
                min: 'original', max: 'original', minRange: 25
              },
              x: {
                min: 'original', max: 'original', minRange: 31540000000*10, // year in milliseconds * 10
            },
          },
        },
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "v03 plot",
    },
  },
  scales: {
      xAxis: {
        type: "time",
        time: {
          unit: "year",
        },
        grid: {
          color: "grey",
        },
      },
      y: {
        grid: {
          color: "grey",
        },
      },
  },
  elements: {
    point: {
        radius: 0 // disabled point draw in all datasets
    }
  }
};

const chartRef = React.useRef(null);

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };
  
  return (
    <div className="vis-div">
        <h1>Visualization 03 & 04</h1>
        <button onClick={handleResetZoom}>Reset Zoom</button>
        <Line 
        ref={chartRef}
        type='line'
        options={options} 
        data={data} 
        redraw = 'true'
        />
        <h4 className="info-title">Description:</h4>
        <p className="info-text">
          Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958 with Antarctic Ice Core records of atmospheric CO2 ratio.</p>
        <a className="source-link" href="https://gml.noaa.gov/ccgg/about/co2_measurements.html">Description source 1</a>
        <a className="source-link" href="https://gml.noaa.gov/ccgg/trends/">Data source 1</a>
        <a className="source-link" href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html">Description source 2</a>
        <a className="source-link" href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat">Data source 2</a>

    </div>
  );
}

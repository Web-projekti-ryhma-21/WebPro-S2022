import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization3n4(){
    Chart.register(zoomPlugin);

    const [moaAnn, setMoaAnn] = useState([]);
    const [moaMonth, setMoaMonth] = useState([]);
    const [icDe081, setIcDe081] = useState([]);
    const [icDe082, setIcDe082] = useState([]);
    const [icDss, setIcDss] = useState([]);
    
    const port = 3001
    const domain = 'http://localhost'
    const rest01 = 'v3annnual'
    const rest02 = 'v3monthly'
    const rest03 = 'v4ica1'
    const rest04 = 'v4ica2'
    const rest05 = 'v4ica3'
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getMoaAnn() {
        const r = await axios.get(`${domain}:${port}/${rest01}`);
        setMoaAnn(r.data);
      }
      async function getMoaMonth() {
        const r = await axios.get(`${domain}:${port}/${rest02}`);
        setMoaMonth(r.data);
      }
      async function getDe081() {
        const r = await axios.get(`${domain}:${port}/${rest03}`);
        setIcDe081(r.data);
      }
      async function getDe082() {
        const r = await axios.get(`${domain}:${port}/${rest04}`);
        setIcDe082(r.data);
      }
      async function getIcDss() {
        const r = await axios.get(`${domain}:${port}/${rest05}`);
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
          label: "Mauna Loa CO2 annual mean data",
          data: moaAnn,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"date",
              yAxisKey:"mean",
          },
      },
      {
          label: "Mauna Loa CO2 monthly mean",
          data: moaMonth,
          borderColor: "rgb(122, 122, 122)",
          backgroundColor: "rgba(122, 122, 122, 0.8)",
          parsing: {
              xAxisKey:"date",
              yAxisKey:"avg",
          },
      },
      {
          label: "DE08 Ice Core",
          data: icDe081,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"year",
              yAxisKey:"co2ppm",
          },
      },
      {
          label: "DE08-2 Ice Core",
          data: icDe082,
          borderColor: "rgb(122, 122, 122)",
          backgroundColor: "rgba(122, 122, 122, 0.8)",
          parsing: {
              xAxisKey:"year",
              yAxisKey:"co2ppm",
          },
      },
      {
          label: "DSS Ice Core",
          data: icDss,
          borderColor: "rgb(122, 122, 122)",
          backgroundColor: "rgba(122, 122, 122, 0.8)",
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
  plugins: {
      zoom: {
        zoom: {
            wheel: {
              enabled: true,
            },
            drag: {
              enabled: true,
              treshold: 100,
            },
            mode: 'xy',
          },
          limits: {
              y: {min: 250, max: 450, /*minRange: 0.1*/},
              x: {min: 'original', max: 'original'/*, minRange: 30*/},
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
          unit: "month",
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
    <div style={{ width: "95%" }}>
      <h1>Visualization 03 & 04</h1>
        <Line 
        ref={chartRef}
        type='line'
        options={options} 
        data={data} 
        redraw = 'true'
        />
        <button onClick={handleResetZoom}>Reset Zoom</button>
        <a className="source-link" href="">Source</a>
    </div>
  );
}

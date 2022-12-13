import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization01(){
    Chart.register(zoomPlugin);
    Chart.defaults.color = '#a0a0a0';

    const [glMonth, setGlMonth] = useState([]);
    const [noMonth, setNoMonth] = useState([]);
    const [soMonth, setSoMonth] = useState([]);
    const [glAnn, setGlAnn] = useState([]);
    const [noAnn, setNoAnn] = useState([]);
    const [soAnn, setSoAnn] = useState([]);
    const [vTwo, setVTwo] = useState([]);

  
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getGlAnn() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/globalannual");
        setGlAnn(r.data);
      }
      async function getNoAnn() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/northernhemisphereannual");
        setNoAnn(r.data);
      }
      async function getSoAnn() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/southernhemisphereannual");
        console.log(r.data);        
        setSoAnn(r.data);
      }
      async function getGlMonth() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/globalmonthly");
        setGlMonth(r.data);
      }
      async function getNoMonth() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/northernhemispheremonthly");
        setNoMonth(r.data);        
      }
      async function getSoMonth() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/southernhemispheremonthly");
        console.log(r.data);        
        setSoMonth(r.data);        
      }
      async function getVTwo() {
        const r = await axios.get(process.env.REACT_APP_API_ADDRESS + "/v2");
        setVTwo(r.data);
        console.log(r.data);        
      }
      getGlAnn();
      getGlMonth();
      getNoAnn();
      getNoMonth();
      getSoAnn();
      getSoMonth(); 
      getVTwo(); 
    }, []);



const data = {
    datasets: [
      {
          label: "Global annual temperature anomaly",
          data: glAnn,
          borderColor: "rgb(140, 0, 0)",
          backgroundColor: "rgba(140, 0, 0, 1)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "Global mothly temperature anomaly",
          data: glMonth,
          borderColor: "rgb(140, 0, 0)",
          backgroundColor: "rgba(140, 0, 0, 1)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "Northern hemisphere annual temperature anomaly",
          data: noAnn,
          borderColor: "rgb(0, 0, 140)",
          backgroundColor: "rgba(0, 0, 140, 1)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "Northern hemisphere mothly temperature anomaly",
          data: noMonth,
          borderColor: "rgb(0, 0, 140)",
          backgroundColor: "rgba(0, 0, 140, 1)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "Southern hemisphere annual temperature anomaly",
          data: soAnn,
          borderColor: "rgb(0, 140, 0)",
          backgroundColor: "rgba(0, 140, 0, 1)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "Southern hemisphere mothly temperature anomaly",
          data: soMonth,
          borderColor: "rgb(0, 140, 0)",
          backgroundColor: "rgba(0, 140, 0, 1)",
          parsing: {
              xAxisKey:"time", // jos ei piirry niin tarkista tietokanta, koska kirjainkoolla on väliä ja ekassa tk'ssa oli isolla kirjaimella
              yAxisKey:"anomaly",
          },
      },
      {
        label: "2000 year temperature anomaly",
        data: vTwo,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        parsing: {
            xAxisKey:"time",
            yAxisKey:"anomaly",
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
                min: 'original', max: 'original', minRange: 0.5
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
      text: "v01 plot",
    },
  },
  scales: {
      x: {
        type: "time",
        display: true,
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
        <h1>Visualization 01 & 02</h1>
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
          Global historical surface temperature anomalies from January 1850 onwards with Northern Hemisphere temperature reconstruction for the past 2000 years.</p>
        <a className="source-link" href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Source 1</a>
        <a className="source-link" href="https://www.nature.com/articles/nature03265">Source 2</a>
    </div>
  );
}

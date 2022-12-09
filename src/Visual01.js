import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization01(){
    Chart.register(zoomPlugin);

    const [glMonth, setGlMonth] = useState([]);
    const [noMonth, setNoMonth] = useState([]);
    const [soMonth, setSoMonth] = useState([]);
    const [glAnn, setGlAnn] = useState([]);
    const [noAnn, setNoAnn] = useState([]);
    const [soAnn, setSoAnn] = useState([]);
    const [vTwo, setVTwo] = useState([]);

    
    const port = 3001
    const domain = 'http://localhost'
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getGlAnn() {
        const r = await axios.get(`${domain}:${port}/globalannual`);
        setGlAnn(r.data); 
      }
      async function getNoAnn() {
        const r = await axios.get(`${domain}:${port}/northernhemisphereannual`);
        setNoAnn(r.data);
      }
      async function getSoAnn() {
        const r = await axios.get(`${domain}:${port}/southernhemisphereannual`);
        console.log(r.data);        
        setSoAnn(r.data);
      }
      async function getGlMonth() {
        const r = await axios.get(`${domain}:${port}/globalmonthly`);
        setGlMonth(r.data);
      }
      async function getNoMonth() {
        const r = await axios.get(`${domain}:${port}/northernhemispheremonthly`);
        setNoMonth(r.data);        
      }
      async function getSoMonth() {
        const r = await axios.get(`${domain}:${port}/southernhemispheremonthly`);
        console.log(r.data);        
        setSoMonth(r.data);        
      }
      async function getVTwo() {
        const r = await axios.get(`${domain}:${port}/v2`);
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
          label: "global annual ",
          data: glAnn,
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "global mothly ",
          data: glMonth,
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "northern hemisphere annual ",
          data: noAnn,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "northern hemisphere mothly ",
          data: noMonth,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "southern hemisphere annual ",
          data: soAnn,
          borderColor: "rgb(0, 255, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"time",
              yAxisKey:"anomaly",
          },
      },
      {
          label: "southern hemisphere mothly ",
          data: soMonth,
          borderColor: "rgb(0, 255, 0)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          parsing: {
              xAxisKey:"time", // jos ei piirry niin tarkista tietokanta, koska kirjainkoolla on väliä ja ekassa tk'ssa oli isolla kirjaimella
              yAxisKey:"anomaly",
          },
      },
      {
        label: "2000 year temperature ",
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
  plugins: {
      zoom: {
        zoom: {
            wheel: {
              enabled: true,
            },
            drag: {
              enabled: true,
            },
            mode: 'xy',
          },
          limits: {
              y: {
                min: -2, max: 2, minRange: 0.1
              },
              x: {
                min: 'original', max: 'original',minRange: 30
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
      xAxis: {
        type: "time",
        display: true,
        time: {
          unit: "year",
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
      <h1>Visualization 01</h1>
        <Line 
        ref={chartRef}
        type='line'
        options={options} 
        data={data} 
        redraw = 'true'
        />
        <button onClick={handleResetZoom}>Reset Zoom</button>
        <a className="source-link" href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Source</a>
    </div>
  );
}

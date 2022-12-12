import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization3n4(){
    Chart.defaults.color = '#a0a0a0';

    const [vostokCore, setVostokCore] = useState([]);
    
    const domain = process.engl.REACT_APP_API_ADDRESS
    const rest01 = 'v5vostok'  
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getVostokCore() {
        const r = await axios.get(`${domain}/${rest01}`);
        r.data.reverse(); //reverse array so it goes from past to present
        setVostokCore(r.data);
      }
      getVostokCore();
    }, []);



const data = {
    datasets: [
      {
          label: "CO2 ppm",
          data: vostokCore,
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 1)",
          parsing: {
              xAxisKey:"year", //needs to match column name in db
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
   legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "v05 plot",
    },
  },
  scales: {
      x: {
        grid: {
          color: "grey",
        },
      },
      y: {
        grid: {
          color: "grey",
        },
      }
      /*      
      adapters:{
        date:{
        numberingSystem: "era",
        },
      },
      */
  },
  elements: {
    point: {
        radius: 0 // disabled point draw in all datasets
    }
  }
};
  
  return (
    <div className="vis-div">
        <h1>Visualization 05</h1>
        <Line 
        type='line'
        options={options} 
        data={data} 
        redraw = 'true'
        />
        <h4 className="info-title">Description:</h4>
        <p className="info-text">
          Vostok Ice Core CO2 ppm measurements, from 339 BCE to 415157 BCE.</p>
        <a className="source-link" href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html">Description source</a>
        <a className="source-link" href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2">Data source</a>
    </div>
  );
}

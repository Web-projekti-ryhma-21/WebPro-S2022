import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization06(){
    Chart.register(zoomPlugin);

    const [v7temperaturechange, setv7temperaturechange] = useState([]);
    const [v7co2, setv7co2] = useState([]);
    
    const port = 3001
    const domain = 'http://localhost'
    const rest01 = 'v7temperaturechange'  
    const rest02 = 'v7co2' 
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getv7temperaturechange() {
        const r = await axios.get(`${domain}:${port}/${rest01}`);
        setv7temperaturechange(r.data);
        console.log(r.data); 
      }
      async function getv7co2() {
        const r = await axios.get(`${domain}:${port}/${rest02}`);
        setv7co2(r.data);
        console.log(r.data); 
      }

      getv7temperaturechange();
      getv7co2();
    }, []);

    const data = {
        datasets: [
          {
              label: "v7 temperature change",
              data: v7temperaturechange,
              borderColor: "rgb(0, 0, 0)",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              parsing: {
                  xAxisKey:"year", //needs to match column name in db
                  yAxisKey:"tc",
                  yAxisID:"temp"
              },
          },
          {
            label: "v7 CO2",
            data: v7co2,
            borderColor: "rgb(0, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            parsing: {
                xAxisKey:"year", //needs to match column name in db
                yAxisKey:"co2ppm",
                yAxisID:"co2"
            },
        }
        ],
    };
    const options = {
        responsive: true,
        animation: false,
        plugins: {
            
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: "v07 plot",
          },
        },
        scales: {
          x: {
            type: "linear",
          },
          temp: {
            type: "linear",
            display: true,
            position: 'right',
          },
          co2: {
            type: "linear",
            display: true,
            position: 'left',
          }
        },
        elements: {
          point: {
              radius: 0 // disabled point draw in all datasets
          }
        }
      };
      
      return (
        <div style={{ width: "95%" }}>
          <h1>Visualization 07</h1>
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
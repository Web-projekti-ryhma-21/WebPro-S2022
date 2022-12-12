import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization06(){
    Chart.defaults.color = '#a0a0a0';

    const [v7temperaturechange, setv7temperaturechange] = useState([]);
    const [v7co2, setv7co2] = useState([]);
    
    const domain = REACT_APP_API_ADDRESS
    const rest01 = 'v7temperaturechange'  
    const rest02 = 'v7co2' 
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getv7temperaturechange() {
        const r = await axios.get(`${domain}/${rest01}`);
        setv7temperaturechange(r.data);
      }
      async function getv7co2() {
        const r = await axios.get(`${domain}/${rest02}`);
        setv7co2(r.data);
      }

      getv7temperaturechange();
      getv7co2();
    }, []);

    const data = {
        datasets: [
          {
              label: "Temperature change",
              data: v7temperaturechange,
              borderColor: "rgb(0, 0, 155)",
              backgroundColor: "rgba(0, 0, 155, 0.8)",
              yAxisID:"temp",
              parsing: {
                  xAxisKey:"year", //needs to match column name in db
                  yAxisKey:"tc",
              },
          },
          {
            label: "CO2 ppm",
            data: v7co2,
            borderColor: "rgb(0, 155, 0)",
            backgroundColor: "rgba(0, 155, 0, 0.8)",
            yAxisID:"co2ppm",
            parsing: {
                xAxisKey:"year", //needs to match column name in db
                yAxisKey:"co2",
            },
        }
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
            text: "v07 plot",
          },
        },
        scales: {
          x: {
            type: "linear",
            reverse: true,
            grid: {
              color: "grey",
            },
          },
          temp: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              color: "grey",
            },
            ticks:{
              color: "grey",
            }
          },
          co2ppm: {
            type: 'linear',
            display: true,
            position: 'left',
            grid:{
              drawOnChartArea: true,
              color: "white",
            }
          }
        },
        elements: {
          point: {
              radius: 0 // disabled point draw in all datasets
          }
        }
      };

     
      return (
        <div className="vis-div">
            <h1>Visualization 07</h1>
            <Line 
            type='line'
            options={options} 
            data={data} 
            redraw = 'true'
            />
            <h4 className="info-title">Description:</h4>        
            <p className="info-text">
              Reconstruction of evolution of global temperature over the past 2 million years and Co2 measurements from the past 800 000 years.
            </p>
            <a className="source-link" href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">Description source</a>
            <a className="source-link" href="http://carolynsnyder.com/publications.php">Data source</a>
        </div>
      );
}
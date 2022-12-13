import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization06(){
    Chart.defaults.color = '#a0a0a0';

    const [icecore800k, setIcecore800k] = useState([]);
    
    const port = 3001
    const domain = 'http://localhost'
    const rest01 = 'v6icecore'  
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getIcecore800k() {
        const r = await axios.get(`${domain}:${port}/${rest01}`);
        r.data.reverse(); //reverse array so it goes from past to present
        setIcecore800k(r.data);
      }

      getIcecore800k();
    }, []);

    const data = {
        datasets: [
          {
              label: "Ice Core 800k CO2 ppm",
              data: icecore800k,
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
            text: "v06 plot",
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
        },
        elements: {
          point: {
              radius: 0 // disabled point draw in all datasets
          }
        }
      };
              
        return (
          <div className="vis-div">
              <h1>Visualization 06</h1>
              <Line 
              type='line'
              options={options} 
              data={data} 
              redraw = 'true'
              />
              <h4 className="info-title">Description:</h4>
              <p className="info-text">
                Reconstruction of atmospheric CO2 concentrations for the last 800,000 years from the European Project for Ice Coring in Antarctica Dome ice core from Dome C (EDC). 
              </p>
              <a className="source-link" href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">Description source</a>
              <a className="source-link" href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt">Data source</a>
          </div>
        );
}
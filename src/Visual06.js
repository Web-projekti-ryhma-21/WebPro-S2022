import React, {useState, useEffect} from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization06(){
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
              label: "Ice Core 800k data",
              data: icecore800k,
              borderColor: "rgb(0, 0, 0)",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
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
            xAxis: {
              display: false,
            },
        },
        elements: {
          point: {
              radius: 0 // disabled point draw in all datasets
          }
        }
      };
              
        return (
          <div style={{ width: "95%" }}>
            <h1>Visualization 06</h1>
              <Line 
              type='line'
              options={options} 
              data={data} 
              redraw = 'true'
              />
              <a className="source-link" href="">Source</a>
          </div>
        );
}
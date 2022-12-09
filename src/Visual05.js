import React, {useState, useEffect} from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization3n4(){
    const [vostokCore, setVostokCore] = useState([]);
    
    const port = 3001
    const domain = 'http://localhost'
    const rest01 = 'v5vostok'  
    
    //fetching chart data from server database
    //times should be strings

    useEffect(() => {
      async function getVostokCore() {
        const r = await axios.get(`${domain}:${port}/${rest01}`);
        r.data.reverse(); //reverse array so it goes from past to present
        setVostokCore(r.data);
      }
      getVostokCore();
    }, []);



const data = {
    datasets: [
      {
          label: "Vostok Ice Core CO2 data",
          data: vostokCore,
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
      text: "v05 plot",
    },
  },
  scales: {
    /*
      xAxis: {
        type: "time",
        time: {
          unit: "year",
        },
      },
      
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
    <div style={{ width: "95%" }}>
      <h1>Visualization 05</h1>
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

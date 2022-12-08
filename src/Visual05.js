import React, {useState, useEffect} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import "chartjs-adapter-luxon";

export default function Visualization3n4(){
    //Chart.register(zoomPlugin);

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
        console.log(r.data); 
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
    /*
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
              y: {min: 250, max: 450, minRange: 0.1},
              x: {min: 'original', max: 'original', minRange: 30},
          },
        },
    */
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

const chartRef = React.useRef(null);

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };
  
  return (
    <div style={{ width: "95%" }}>
      <h1>Visualization 05</h1>
        <Line 
        ref={chartRef}
        type='line'
        options={options} 
        data={data} 
        redraw = 'true'
        />
        <a className="source-link" href="">Source</a>
    </div>
  );
}

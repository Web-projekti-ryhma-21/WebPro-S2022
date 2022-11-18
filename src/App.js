import './App.css';
import Co2Chart from './Co2chart';
import Visualization01Monthly from './Visual01monthly';
import Visualization01Annual from './Visual01annual';

function App() {
  return (
    <div className="App">
      <Visualization01Monthly />
      <Visualization01Annual />
    </div>
  );
}

export default App;

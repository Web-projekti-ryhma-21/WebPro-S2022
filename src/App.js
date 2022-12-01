import './App.css';
import Visualization01 from './Visual01';
import Koti from './Koti';
import LoginView from './LoginView';
import ProtectedView from './ProtectedView';
import SignUpView from './SignUpView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Koti /> } />
        <Route path='/login' element= { <LoginView /> } />
        <Route path='/protected' element={ <ProtectedView /> } />
        <Route path='/signup' element={ <SignUpView /> } />
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;

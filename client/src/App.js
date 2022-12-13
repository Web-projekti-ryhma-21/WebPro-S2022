import './App.css';
import Nakyma1 from './Nakyma1';
import Visualization01 from './Visual01';
import Visualization3n4 from './Visual3n4';
import Visualization05 from './Visual05';
import Koti from './Koti';
import LoginView from './LoginView';
import ProtectedView from './ProtectedView';
import SignUpView from './SignUpView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [userJwt, setUserJwt] = useState(null);

  let authRoutes = <>
  <Route path='/login' element= { <LoginView login={ newJwt => {
    setUserJwt(newJwt);
  } }/> } />
  <Route path='/signup' element={ <SignUpView /> } />
  </>

  if (userJwt != null){
    authRoutes = <Route path='/visuals' element={ <Visualization01 /> } />
  }

  return (

    <div>
      <Nakyma1 />

      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Koti userLoggedIn={userJwt != null} /> } />
        { authRoutes }
        <Route path="*" element={ <Koti userLoggedIn={userJwt != null} /> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

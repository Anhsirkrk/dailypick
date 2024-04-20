import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Rout from './Components/Rout';
import { UserAuthContextProvider } from './Context/UserAuthContext'; // Import your context provider



function App() {
  return (
    <>
  <UserAuthContextProvider>
      <BrowserRouter>
      
        <Rout  />
        
        
      </BrowserRouter>
      </UserAuthContextProvider>
  
  </>
  );
}

export default App;

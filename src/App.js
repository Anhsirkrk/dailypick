import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Rout from './Components/Rout';
import { UserAuthContextProvider } from './Context/UserAuthContext'; // Import your context provider
import { UserAuthProvider } from './Components/UserAuthContext';



function App() {
  return (
    <>
    <UserAuthProvider>
     <UserAuthContextProvider>
      <BrowserRouter>
      
        <Rout  />
        
      </BrowserRouter>
    </UserAuthContextProvider>
    </UserAuthProvider>
  
  </>
  );
}

export default App;

import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';

const Rout = () => {
  return (
    <>
        <Routes>
 
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        
        </Routes>
    </>
  )
}

export default Rout;
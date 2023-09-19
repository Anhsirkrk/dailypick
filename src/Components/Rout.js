import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Login2 from '../Pages/Login2'

const Rout = () => {
  return (
    <>
        <Routes>
 
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login2' element={<Login2 />} />
        
        </Routes>
    </>
  )
}

export default Rout;
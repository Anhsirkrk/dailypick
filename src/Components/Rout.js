import React from 'react';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Login2 from '../Pages/Login2';
import Home2 from '../Pages/Home2';
import Trail from '../Trail/Trail';
import Popup from '../Pages/PopUp';
import Products from '../Pages/Products';
import Location from '../Pages/Location';
const Rout = () => {
  return (
    <>
        <Routes>
        <Route
        path="/popup"
        element={<Popup key={Math.random()} />} // Add a random key to force re-render
      />
          <Route path='/home' element={<Home />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/home2' element={<Home2/>}/>
          <Route path='/trail' element={<Trail/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path="/*" element={<Navigate to="/popup" replace />} />
          <Route path="/location" element={<Location/>}/>
        </Routes>
    </>
  )
}
export default Rout;
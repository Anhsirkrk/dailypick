import React from 'react';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Login2 from '../Pages/Login2';
import Home2 from '../Pages/Home2';
import Trail from '../Trail/Trail';
import Popup from '../Pages/PopUp';

const Rout = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <>
        <Routes>
        <Route
        path="/popup"
        element={<Popup key={Math.random()} />} // Add a random key to force re-render
      />
          <Route path='/home' element={<Home />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/home2' element={isLoggedIn ? <Home2/> : <Navigate to="/login2" />} />
          <Route path='/trail' element={<Trail/>}/>
          <Route path="/*" element={<Navigate to="/popup" replace />} />
        </Routes>
    </>
  )
}
export default Rout;
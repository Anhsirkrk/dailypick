import React from 'react';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';
import Login2 from '../Pages/Login2';
import Home2 from '../Pages/Home2';
import Popup from '../Pages/PopUp';
import Products from '../Pages/Products';
import SingleProduct from '../Pages/SingleProduct';
import Location from '../Pages/Location';
import Profile from '../Pages/Profile';
import MySubscriptions from '../Pages/MySubscriptions';
import MyCart from '../Pages/MyCart';
import MyWishlist from '../Pages/MyWishList';
import PaymentStatus from '../Pages/PaymentStatus'
import SupplierHomepage from '../Pages/SupplierHomepage';
import SupplierLogin from '../Pages/SupplierLogin';
import { useUserAuth } from '../Context/UserAuthContext'; // Import the UserAuthContext

const Rout = () => {
  const userAuth = useUserAuth(); // Log the entire context value
console.log(userAuth);
  const { isUserLoggedIn } = useUserAuth(); // Get the isUserLoggedIn state from the context
  console.log("isUserLoggedIn : ",isUserLoggedIn)
  return (
    <>
        <Routes>
//user          
          <Route path="/*" element={<Navigate to="/popup" replace />} />  
          <Route path="/popup" element={<Popup key={Math.random()} />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/home2' element={<Home2/>} shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/products' element={<Products/>} shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/singleproduct' element={<SingleProduct/>} shouldNavigate={() => isUserLoggedIn}/> 
          <Route path="/location" element={<Location/>} shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/profile' element={<Profile/>} shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/mysusbcription' element={<MySubscriptions/>} shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/mycart' element={<MyCart/>} shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/mywishlist' element={<MyWishlist/>}  shouldNavigate={() => isUserLoggedIn}/>
          <Route path='/paymentstatus' element={<PaymentStatus/>} shouldNavigate={() => isUserLoggedIn}/>
//suppler
          <Route path='/supplierhomepage' element={<SupplierHomepage/>}/>
          <Route path='/supplierlogin' element={<SupplierLogin/>}/>
        </Routes>
    </>
  )
}
export default Rout;

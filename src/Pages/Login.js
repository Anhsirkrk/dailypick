import React from 'react';
import '../Css/Login.css';
import { useState } from 'react';
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import OtpInput from 'react-otp-input';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useUserAuth } from "../Context/UserAuthContext";
import PhoneInput from "react-phone-number-input";
import axios, { formToJSON } from 'axios';
import {ToastContainer,toast } from 'react-toastify';
import logocover from '../Images/logocover.png'



const Login = () => {


  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();

  const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        console.log(number);
        setError("");
        if (number === "" || number === undefined)
          return setError("Please enter a valid phone number!");
        try {
          const response = await setUpRecaptha(number);
          setResult(response);
          setFlag(true);
        } catch (err) {
          setError(err.message);
        }
      };

      
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      alert("opt verified");
      navigate('/home');
      // userchecking(number);
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(number);


  //   const [mobileNumber, setMobileNumber] = useState('');
  // const [otp, setOtp] = useState('');
  // const [isOtpSent, setIsOtpSent] = useState(false);

  // const handleSendOtp = () => {
  //   // Simulate OTP sending logic (you can replace this with your API call)
  //   setIsOtpSent(true);
  // };

  // const handleVerifyOtp = () => {
  //   // Simulate OTP verification logic (you can replace this with your API call)
  //   console.log(`OTP Verified: ${otp}`);
  // };


  return (

    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <div className='login-h2-div'>
            <h1>Get your daily needs here</h1>
          </div>
          <div className='logocover'>
          <img className='logocover-img' src={logocover} ></img>
          </div>
        </div>
        <div className='col-4'>
        

    <div className='Login_container'>
    <div className='Login_contant'>
        <h4>Login </h4>
       <div className='Login-form'>
        <div className="p-4 box">
        
       
        {error && <Alert variant="danger">{error}</Alert>}
        <div>
        <Form className='MobileLoginForm' onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className='phoneinput'>
            <PhoneInput 
             
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
       
            />
            </div>
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Send Otp
            </Button>
          </div>
        </Form>
        </div>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="EnterOtp-div mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>
      </div>
        </div>
    </div>
    </div>
  </div> 
 
  </div> 
        </div>
 
  


  )
}

export default Login
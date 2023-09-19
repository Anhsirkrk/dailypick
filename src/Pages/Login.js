import React from 'react';
import '../Css/Login.css';
import { useState,useEffect } from 'react';
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
import logocover from '../Images/logocover.png';




const Login = () => {



  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();

  const navigate = useNavigate();

  // const [currentPage, setCurrentPage] = useState('loginwithotp');
  // const [mdcurrentPage, setMDCurrentPage] = useState('subscription');

  const handleMobileNumberChange=(e)=>{
setNumber(e.target.value);
  };

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

{/*}
  const renderContent = () => {
    switch (currentPage) {
      case 'loginwithotp':
        return <LoginWithOTP />;
      case 'loginwithpasword':
        return <LoginWithPassword />;
              default :
        return null;
    }
  };
*/}

  const LoginWithOTP=()=>{
    return(
      <div></div>
   
    )
  }

  const LoginWithPassword=()=>{
    return(
    <div className='Login_container'>
    <div className='Login_contant'>
    <h3 >Login with <span style={{ fontWeight: "bold" }}>OTP</span></h3>
    <div className='Login-form'>
        <div className="p-4 box">
        
       
        {error && <Alert variant="danger">{error}</Alert>}
        <div>
        <Form className='MobileLoginForm' onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <p>Login With Password</p>
          <div className='phoneinputdiv'>
            <div >
            <input className='phoneinputdiv-countrycode' type='tel' value={"+91"}></input>
            </div>
            <div className='phoneinput'>
              <PhoneInput 
              
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
        
              />
              </div>
            </div>
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div >
            <Button className='sendOtpButton' type="submit" variant="primary">
              Get OTP
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
    )
  }

  

  return (

    <div className='LGpage-container'>
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
         {/*} {renderContent()} */}
          <div className='Login_container'>
          <div className='Login_contant'>
            <h3 >Login with <span style={{ fontWeight: "bold" }}>OTP</span></h3>
            <br></br>
            <div className='Login-form'>
            <div className="p-4 box">
            {error && <Alert variant="danger">{error}</Alert>}
              <div>
                <Form className='MobileLoginForm' onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                  <p>Phone No</p>
                  <div style={{display:'flex'}}>
                  <div>
                  <input className='countrycodeinput' type='text' value={'+91'}/>
                  </div>
                 
                  <div className='phoneinputdiv'>
                    <div className=''>
                    <PhoneInput 
                    className='phonenumberinput'
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={number}
                    onChange={setNumber}
                     />
              
                    </div>
                  </div>
                  </div>
                  <div id="recaptcha-container"></div>
                
                <div >
                  <Button className='sendOtpButton' type="submit" variant="primary">
                    Get OTP
                  </Button>
                </div>
              </Form>
            </div>
    
            <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
              <Form.Group className="EnterOtp-div mb-3" controlId="formBasicOtp">
                
                <input 
                className='otpinput'
                type="otp"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}/>
                
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
            <div>
              <div style={{display:'flex', flexDirection:'column',justifyItems:'flex-start',marginLeft:'20px'}}>
              <p style={{ paddingTop: '10px', margin: '50px 0px 0px 10px', fontSize: '15px', fontWeight: 'medium' }}>--------------------- OR ---------------------</p>
              <div>
              <p style={{marginTop:'10px',marginLeft:'95px'}}><a style={{ color:'#024172',paddingTop: '40px', fontSize: '12px',fontWeight: '400'}}>Sign in with E@Mail</a></p>
              </div>
              </div>
              <p style={{marginTop:'30px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
          </div>
        </div>
        </div>
        </div> 
 
       </div> 
    </div>
 
  


  )
}

export default Login
import React, { useState,useEffect }  from 'react';
import '../Css/Login2.css';
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

  const [loginwithotpshow,setloginwithotpshow]= useState(true);
  const [loginwithemail,setloginwithemailshow]= useState(false);

  const navigate = useNavigate();

   const [currentPage, setCurrentPage] = useState('LoginWithemailid');
   const [mdcurrentPage, setMDCurrentPage] = useState('subscription');

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


  {/* const renderContent = () => {
    switch (currentPage) {
      case 'loginwithotp':
        return <LoginWithOTP />;
        case 'LoginWithemailid':
    return <LoginWithemail />;
              default :
        return null;
    }
  }; */}

  const LoginWithOTP=()=>{
    return(
        <div className='LoginBox_container'>
      <div className='Login_contant'>
        <div className='LoginContainerHeader'>
        <center>
            <h3 >Login with <span style={{ fontWeight: "bold" }}>OTP</span></h3>
            </center>
        </div>

        <br></br>
        <div className='Login2-form'>
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
              maxLength={6}
              onChange={e=>setOtp(e.target.value)}/>
            
          </Form.Group>
          <div className="button-right">
          
   
            <Button className='otpverifyBtn' type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>

      </div>
        </div>
        </div>
        <div className='LoginConatiner_Bottomdiv'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <p style={{marginTop:'10px'}}><a style={{ fontFamily:'system-ui' ,color:'#024172',paddingTop: '40px', fontSize: '15px',fontWeight: '600'}}>Sign in with E@Mail</a></p>
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
      </div>
    
    </div>
   
    )
  }

  const LoginWithemail=()=>{
    return(
        <div className='LoginBox_container'>
      <div className='Login_contant'>
        <div className='LoginContainerHeader'>
        <center>
            <h3 >Login with <span style={{ fontWeight: "bold" }}>OTP</span></h3>
            </center>
        </div>

        <br></br>
        <div className='Login2-form'>
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
              maxLength={6}
              onChange={e=>setOtp(e.target.value)}/>
            
          </Form.Group>
          <div className="button-right">
          
   
            <Button className='otpverifyBtn' type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>

      </div>
        </div>
        </div>
        <div className='LoginConatiner_Bottomdiv'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <p style={{marginTop:'10px'}}><a style={{ fontFamily:'system-ui' ,color:'#024172',paddingTop: '40px', fontSize: '15px',fontWeight: '600'}}>Sign in with E@Mail</a></p>
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
      </div>
    
    </div>
   
    )
  }
  
  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", loginwithotpshow);
  }, [loginwithotpshow,loginwithemail]);

 {/*} const showloginwithEmail=()=>{
    setloginwithotpshow(false);
    alert("false");
    setloginwithemailshow(true);
    alert("true");
  } */}
  const showloginwithEmail = () => {
    setloginwithotpshow(prevState => {
      console.log('Before setting loginwithotpshow:', prevState);
      return false;
    });
    console.log('After setting loginwithotpshow:', loginwithotpshow);
  
    setloginwithemailshow(prevState => {
      console.log('Before setting loginwithemailshow:', prevState);
      return true;
    });
    console.log('After setting loginwithemailshow:', loginwithemail);
  };

  const showloginwithOTp =()=>{
    setloginwithotpshow(prevState => {
        console.log('Before setting loginwithotpshow:', prevState);
        return true;
      });
      console.log('After setting loginwithotpshow:', loginwithotpshow);
      setloginwithemailshow(prevState => {
        console.log('Before setting loginwithemailshow:', prevState);
        return false;
      });
      console.log('After setting loginwithemailshow:', loginwithemail);
  }


  return (

    <div className='Login2-container'>
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
<div>
  <div className='LoginBox_container' style={{ display: loginwithotpshow ? "block" : "none" }}>
      <div className='Login_contant'>
        <div className='LoginContainerHeader'>
        <center>
            <h3 >Login with <span style={{ fontWeight: "bold" }}>OTP</span></h3>
            </center>
        </div>

        <br></br>
        <div className='Login2-form'>
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
              maxLength={6}
              onChange={e=>setOtp(e.target.value)}/>
            
          </Form.Group>
          <div className="button-right">
          
   
            <Button className='otpverifyBtn' type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>

      </div>
        </div>
        </div>
        <div className='LoginConatiner_Bottomdiv'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <Button className='signinwithemailbutton' onClick={showloginwithEmail}> Sign in with E@Mail</Button>
          <p style={{marginTop:'10px'}}><a style={{ fontFamily:'system-ui' ,color:'#024172',paddingTop: '40px', fontSize: '15px',fontWeight: '600'}} onClick={showloginwithEmail}>Sign in with E@Mail</a></p>
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
      </div>
    
  </div> 


  <div className='LoginBox_container' style={{ display: loginwithemail ? "block" : "none" }}>
      <div className='Login_contant'>
        <div className='LoginContainerHeader'>
        <center>
            <h3 >Login with <span style={{ fontWeight: "bold" }}>Email</span></h3>
            </center>
        </div>

        <br></br>
        <div className='Login2-form'>
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
              maxLength={6}
              onChange={e=>setOtp(e.target.value)}/>
            
          </Form.Group>
          <div className="button-right">
          
   
            <Button className='otpverifyBtn' type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>

      </div>
        </div>
        </div>
        <div className='LoginConatiner_Bottomdiv'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <Button className='signinwithemailbutton' onClick={showloginwithOTp}> Sign in with OTP</Button>
          <p style={{marginTop:'10px'}}><a style={{ fontFamily:'system-ui' ,color:'#024172',paddingTop: '40px', fontSize: '15px',fontWeight: '600'}} onClick={showloginwithEmail}>Sign in with E@Mail</a></p>
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
      </div>
    
  </div> 
  </div>

    </div> 

   </div> 
    </div>


  )
}

export default Login
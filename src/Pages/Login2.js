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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';




const Login = () => {



  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [name,setName]=useState("");

  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();

  const [timer, setTimer] = useState(5);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setTimerActive(false);
    }
  }, [timer]);

  const resendOTP = () => {
    alert("hitted");
    console.log(timerActive)
    if (!timerActive) {
      setTimer(5);
      setTimerActive(true);
      getresendOtp(number);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [loginwithotpshow,setloginwithotpshow]= useState(true);
  const [loginwithemail,setloginwithemailshow]= useState(false);
  const [regisitrationForm,setRegisatrtionFormShow]= useState(false);

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
          setTimer(5);
          setTimerActive(true);
        } catch (err) {
          setError(err.message);
        }
      };

      const getresendOtp = async (e) => {
        alert("getresendOtp");
        console.log(number);
        setError("");
        if (number === "" || number === undefined){
        alert("num is invalid or undefined");
          return setError("Please enter a valid phone number!");
        }
        try {
          alert("hitted try");
          const response = await setUpRecaptha(number);
          alert(" hitted set up recptcha ");
          setResult(response);
          setFlag(true);
          setTimer(5);
          setTimerActive(true);
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

  const RegistrationForm=()=>{
    return(
      <div className='RegistartionBox_container' style={{ display: regisitrationForm ? "block" : "none" }}>
      <div className='Login_contant'>
        <div className='LoginContainerHeader'>
        <center>
            <h3 >Create an   <span style={{ fontWeight: "bold" }}>Account</span></h3>
            </center>
        </div>
        <div className='Login2-form'>
        <div className="p-4 box">
        {error && <Alert variant="danger">{error}</Alert>}
          <div>
            <Form className='MobileLoginForm' onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
              <p>Enter your Name</p>
              <div className='nameinputdiv'>
                <input 
                type='text'
                className='name-input'
                placeholder="Enter name"
                value={name}
                onChange={setName}
                 />
              </div>
              <p>Enter Email</p>
              <div className='emailinputdiv'>
                <input 
                type='email'
                className='email-input'
                placeholder="Enter Email"
                value={email}
                onChange={setEmail}
                 />
              </div>
              <p>Phone No</p>
              <div style={{display:'flex'}}>
                  <div>
                  <input className='countrycodeinput' type='text' value={'+91'}/>
                  </div>
                
                  <div className='phoneinputdiv'>
                    <PhoneInput 
                    className='phonenumber-input'
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={number}
                    onChange={setNumber}
                    />
                  </div>
              </div>
              <p>Enter password</p>
              <div className="password-input-container">
                 <input
                 type={passwordVisible ? "text" : "password"}
                 className='password-input'
                 placeholder="Enter password "
                 value={password}
                 onChange={e=>setPassword(e.target.value)}
                  />
                  <span onClick={togglePasswordVisibility} className="regform-password-icon">
                  <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                  </span>
                  </div>
              
              
            
            <div >
              <Button className='submit-Button' type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
        </div>
        </div>
        <div className='registrationConatiner_Bottomdiv'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <p style={{padding:'0px', margin:'0px'}}>Already have an Account</p>
          </div>
          <div className='alternateButtonDiv'>
          <Button className='Regpage-signinwitheOTPbutton' onClick={showloginwithOTp} >sign in with otp </Button>
          <Button className='Regpage-signinwithEmailbutton' onClick={showloginwithEmail}> sign in with password</Button>

          </div>
          
      </div>
    
  </div> 
    )
  }

 {/*} const LoginWithemail=()=>{
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
  } */}
  
  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", loginwithotpshow);
  }, [loginwithotpshow,loginwithemail,regisitrationForm]);

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

    setRegisatrtionFormShow(prevState => {
      console.log('Before setting registrationform:', prevState);
      return false;
    });
    console.log('After setting registrationform:', regisitrationForm);
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
      setRegisatrtionFormShow(prevState => {
        console.log('Before setting registrationform:', prevState);
        return false;
      });
      console.log('After setting registrationform:', regisitrationForm);
  }

  
  const showregistartionform =()=>{
    setloginwithotpshow(prevState => {
        console.log('Before setting loginwithotpshow:', prevState);
        return false;
      });
      console.log('After setting loginwithotpshow:', loginwithotpshow);
      setloginwithemailshow(prevState => {
        console.log('Before setting loginwithemailshow:', prevState);
        return false;
      });
      console.log('After setting loginwithemailshow:', loginwithemail);
      setRegisatrtionFormShow(prevState => {
        console.log('Before setting registrationform:', prevState);
        return true;
      });
      console.log('After setting registrationform:', regisitrationForm);
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
          <div className='didntrecivedotp'>
            <p>Didn't recived OTP?</p>
            <Button id='resendOTPbtn' onClick={resendOTP} className={timerActive ? 'active' : 'inactive' }>Resend OTP in <span style={{color: 'var(--P01, #024172)',fontWeight:'600'}}>{timer}</span> seconds </Button>
          </div>
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
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
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
              <p>Enter Email</p>
              <div style={{display:'flex'}}>
              
             
              <div className='phoneinputdiv'>
                <div className=''>
                <input
                type='email'
                className='email-input'
                placeholder="Enter registered MailID"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                 />
                 <p>Enter Password</p>
                 <div className="password-input-container">
                 <input
                 type={passwordVisible ? "text" : "password"}
                 className='password-input'
                 placeholder="Enter password "
                 value={password}
                 onChange={e=>setPassword(e.target.value)}
                  />
                  <span onClick={togglePasswordVisibility} className="password-icon">
                  <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                  </span>
                  </div>
                
                </div>
              </div>
              </div>
              <div id="recaptcha-container"></div>
            
            <div >
              <Button className='sendOtpButton' type="submit" variant="primary">
                Login
              </Button>
            </div>
          </Form>
        </div>

      </div>
        </div>
        </div>
        <div className='LoginConatiner_Bottomdiv'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <Button className='signinwithemailbutton' onClick={showloginwithOTp}> Sign in with OTP</Button>
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
      </div>
    
        </div> 
        <div className='Regsitrationform_Display' style={{display: regisitrationForm ? "block" :"none"}}>
          <RegistrationForm/>
        </div>
      </div>

    </div> 

   </div> 
    </div>


  )
}

export default Login
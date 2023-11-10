import React, { useState,useEffect }  from 'react';
import '../Css/Login2.css';
import { Link,json,useAsyncError, useNavigate } from 'react-router-dom';
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
import logocover from '../Images/logocover.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast } from 'react-toastify';
import validation from '../Components/validations';
import UerRegistrationPage from '../Pages/Regisatrtion';
import Popup from './PopUp';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; 


const Login = ({}) => {

  const { isUserLoggedIn,setIsUserLoggedIn } = useUserAuth(); // Updated
  const navigate = useNavigate();
  const { logIn } = useUserAuth();


  const [error, setError] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [resultMessage, setResultMessage] = useState('');
  const {countrycode,setcountrycode}=useState('+91');
  const [timer, setTimer] = useState(5);
  const [timerActive, setTimerActive] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginwithotpshow,setloginwithotpshow]= useState(true);
  const [loginwithemail,setloginwithemailshow]= useState(false);
  const [registrationform,setRegistrationForm]= useState(false);
  const [passwordresetshow,setPasswordResetShow]=useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [validationerrors,setValidationErrors]=useState('');
  const [message,setMessage]= useState('');

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
    console.log("login2 page isUserLoggedIn has changed:", isUserLoggedIn);
  }, [isUserLoggedIn]);


  useEffect(() => {
    if (timer === 0) {
      setTimerActive(false);
    }
  }, [timer]);

  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", loginwithotpshow);
  }, [loginwithotpshow,loginwithemail,registrationform,mobilenumber]);

  const resendOTP = () => {
    alert("resend otp hitted");
    console.log(timerActive)
    if (!timerActive) {
      setTimer(5);
      setTimerActive(true);
      getresendOtp(mobilenumber);
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailPasswordLogin = async (e) => {
    alert("handleEmailPasswordLogin hitted")
    e.preventDefault();
    const values={email,password};
    console.log(values);
    const validationErrors = validation(values,['email','password']);
    if(!(validationErrors.email)== '' || !(validationErrors.password)=='' )
    {
      setValidationErrors(validationErrors);
      alert('lg val er mail' + validationErrors.email);
      alert('lg val er pas' + validationErrors.password);
      return;
    }
    try {

      if (email && password) {
        await logIn(email, password);
        navigate("/home2");
      } else {
        setError("Please enter both email and password.");
      }
    } catch (error) {
      setError("Login failed. Check your email and password.");
    }
  };


  const handlePasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
      console.log('After setting loginwithotpshow:', loginwithotpshow);
      setPasswordResetShow(prevState => {
        console.log('Before setting loginwithemailshow:', prevState);
        return false;
      });
      setloginwithemailshow(prevState => {
        console.log('Before setting loginwithemailshow:', prevState);
        return true;
      });
      setMessage("");

    } catch (error) {
      setError(error.message);
    }
  };

  const handlerecoverymailSubmit = (e) => {
    e.preventDefault();
    handlePasswordReset(email);
  };





 
  const verifymobilenumber = async (e) => {
    
    e.preventDefault();
    const values={mobilenumber};

    console.log(values);
  const validationErrors = validation(values,['mobilenumber']);
  console.log(validationErrors);
  if(!(validationErrors.mobilenumber) == '')
  {
    alert("val err");
    setValidationErrors(validationErrors);
    // alert(validationErrors.mobilenumber);
    console.log(validationerrors.mobilenumber);
    return;
  }
  //alert("checking database");
    const url = 'https://localhost:7041/api/Login/GetUserByMobileNumber';
    const data = {
      userId: 0,
      userTypeId: 0,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: mobilenumber,
      email: "",
      isActive: true,
      userFound: true,
      resultMessage: ""
    };
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      if (response.status === 200) 
      {
        //alert("satus 200");
          const sendData = 
          {
            userId: response.data.userId,
            userTypeId: response.data.userTypeId,
            username: response.data.username,
            firstName: response.data.firstname,
            lastName: response.data.lastname,
            mobile: response.data.mobile,
            email: response.data.email,
            userFound: response.data.userFound,
          };
          console.log(sendData);
          if(sendData.userFound === true){
            //alert("user found redirecting to otp gen");
            getOtp(mobilenumber);
            toast.success("user found redirecting to otp gen");
          }
          else if(sendData.userFound === false){
            alert("user   not found");
            toast.error("Invalid User");
            return;
          }
          localStorage.setItem('userdata', JSON.stringify(sendData));
      } 
      else 
      {
        setResultMessage("An unknown error occurred");
      }
    } catch(error) {
      setResultMessage('An error occurred while processing your request.');
      console.error(error);
    }
  
  };
  console.log('login  page user data',localStorage.getItem('userdata'));

  const UserRegistration = async (e)=>{
      e.preventDefault();
      const values={name,email,mobilenumber,password,confirmpassword};
      console.log(values);
    const validationErrors = validation(values);
    console.log(validationErrors);
    alert('lg vl ' + validationErrors.name);
    alert('lg vl ' + validationErrors.email);
    alert('lg vl ' + validationErrors.mobilenumber);
    alert('lg vl ' + validationErrors.password);
    alert('lg vl ' + validationErrors.confirmpassword);

    if(Object.keys(validationErrors).length>0){
    {
      setValidationErrors(validationErrors);
      console.log(validationerrors.mobilenumber);
      return;
    }
    }
  }

    const getOtp = async (mobilenumber) => {
      alert("get opt hitted");
        console.log(mobilenumber);
        setError("");
        if (mobilenumber === "" || mobilenumber === undefined)
          return setError("Please enter a valid phone mobilenumber!");
        try {
          const response = await setUpRecaptha(mobilenumber);
          setResult(response);
          setFlag(true);
          setTimer(5);
          setTimerActive(true);
        } catch (err) {
          setError(err.message);
        }
      };

      const getresendOtp = async (e) => {
        alert("hitted getresendOtp");
        console.log(mobilenumber);
        setError("");
        if (mobilenumber === "" || mobilenumber === undefined){
        alert("num is invalid or undefined");
          return setError("Please enter a valid phone mobilenumber!");
        }
        try { 
          alert("hitted try in get resend otp");
          const response = await setUpRecaptha(mobilenumber);
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
         
          navigate('/home2');
        } catch (err) {
          setError(err.message);
        }
      };
      const ContinueAsaGuest=async(e)=>{
        navigate('/ContinueAsaGuest');
      }

  console.log(mobilenumber);
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

    setRegistrationForm(prevState => {
      console.log('Before setting registrationform:', prevState);
      return false;
    });
    console.log('After setting registrationform:', registrationform);
  };

  const ShowloginwithOTp= ()=> {
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
      setRegistrationForm(prevState => {
        console.log('Before setting registrationform:', prevState);
        return false;
      });
      console.log('After setting registrationform:', registrationform);
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
      setRegistrationForm(prevState => {
        console.log('Before setting registrationform:', prevState);
        return true;
      });
      console.log('After setting registrationform:', registrationform);
  }
  const showpasswordresetform =()=>{
    setPasswordResetShow(prevState => {
      console.log('Before setting passwordresershow:', prevState);
      return true;
    });
    console.log('After setting passwordresershow:', passwordresetshow);
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
    setRegistrationForm(prevState => {
      console.log('Before setting registrationform:', prevState);
      return false;
    });
    console.log('After setting registrationform:', registrationform);

  }
  const handleOtpCancel =()=>{
      navigate('/');
      console.log('After clicking cancel:');
  }
  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", loginwithotpshow);
  }, []);


//sign-in with google

const [isLoggedIn, setIsLoggedIn]=useState(true);
 
const SignUpUsingGoogle=()=>{

const provider=new GoogleAuthProvider();

  signInWithPopup(auth, provider)
  .then((result) => {
    
    const user = result.user;
    
    console.log({user});
    setIsUserLoggedIn(true);
    navigate('/home2');
  }).catch((error) => {
    
    console.log(error);
  });
  
  console.log("Signup using google");

};

// signup google end







  return (
<>
    <div className='Login2-container'>
    <div className='login2-row'>
    <div className='login2-row-col-8'>
      <div className='login-h2-div'>
        <h1>Get your daily needs here</h1>
      </div>
      <div className='logocover'>
      <img className='logocover-img' src={logocover} ></img>
      </div>
    </div>
    <ToastContainer/>
    <div className='login2-row-col-4'>
      <div>
     
       {/* Sign in with OTP Code */}
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
        <div>{resultMessage}</div>
        {error && <Alert variant="danger">{error}</Alert>}
          <div>
            <Form className='MobileLoginForm' onSubmit={verifymobilenumber} style={{ display: !flag ? "block" : "none" }}>
              <p>Phone No</p>
              <div style={{display:'flex'}}>
              <div>
              <input className='countrycodeinput' type='text' value={'+91'}  />
              </div>
             
              <div className='phoneinputdiv'>
                <div className=''>
                <PhoneInput 
                className='phonenumberinput'
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={mobilenumber}
                onChange={(val)=>{setMobileNumber(val);}}
                maxLength={11}
                 />
                 {validationerrors.mobilenumber && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.mobilenumber}</p>}
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
            <Button className='CancelVerifyOtp' type="submit" onClick={handleOtpCancel} variant="primary">
            Cancel
          </Button>
          </div>
        </Form>

      </div>
        </div>
        </div>
        <div className='LoginConatiner_Bottomdiv_loginotp'>
          <div className='ORdiv'>
          <p >------------------------ OR -----------------------</p>
          </div>
          <div className='alternatePageDiv'>
          <Button className='signinwithemailbutton' onClick={showloginwithEmail}> Sign in with E@Mail</Button>
          </div>
          
          <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
          <Button className='ContinueAsaGuestButton' onClick={ContinueAsaGuest} style={{textDecoration:'none'}}> Continue As a Guest ---  </Button>
          <Button className='signinwithemailbutton' onClick={SignUpUsingGoogle}> continue with google</Button>
          </div>
    
        </div> 

    

       {/* Sign in with email Code  */}
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
                  <Form className='MobileLoginForm' onSubmit={handleEmailPasswordLogin} style={{ display: !flag ? "block" : "none" }}>
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
                      {validationerrors.email && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.email}</p>}

                      <p>Enter Password</p>
                      <div className="password-input-container">
                      <input
                      type={passwordVisible ? "text" : "password"}
                      className='password-input'
                      placeholder="Enter password "
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                        />
                        {validationerrors.password && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.password}</p>}
                        <span onClick={togglePasswordVisibility} className="password-icon">
                        <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                        </span>
                        </div>
                      
                      </div>
                    </div>
                    </div>
                    <div id="recaptcha-container"></div>
                  
                  <div >
                    <Button className='sendOtpButton' type="submit"  variant="primary">
                      Login
                    </Button>
                  </div>
                  <a onClick={showpasswordresetform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Forgot PassWord</a>
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
                <Button className='signinwithemailbutton' onClick={ShowloginwithOTp}> Sign in with OTP</Button>
                </div>
                
                <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
            </div>
      
          </div>
            {/* Regisatrtion form  Code */}
           <div className='regisatrtionformdispaly' style={{ display: registrationform ? "block" : "none" }} >
               {<UerRegistrationPage/>}
               <div className='registrationConatiner_Bottomdiv'>
               <div className='ORdiv'>
           {/*}    <p >------------------------ OR -----------------------</p> */}
               </div>
               <div className='alternatePageDiv'>
               <p style={{padding:'0px', margin:'0px', textDecoration:'UNDERLINE'}}>Already have an Account ?</p>
               </div>
               <div className='alternateButtonDiv'>
               <Button className='Regpage-signinwitheOTPbutton' onClick={ShowloginwithOTp} >sign in with otp </Button>
               <Button className='Regpage-signinwithEmailbutton' onClick={showloginwithEmail}> sign in with password</Button>
         
               </div>
               
           </div>
           </div>
          {/* password reset show  Code */}
           <div className='LoginBox_container' style={{ display:passwordresetshow  ? "block" : "none" }}>

           <div className='Login_contant'>
           <div className='LoginContainerHeader'>
           <center>
               <h3 >Recover Password <span style={{ fontWeight: "bold" }}></span></h3>
               </center>
           </div>
   
           <br></br>
           <div className='Login2-form'>
           <div className="p-4 box">
           {message}
           {error && <Alert variant="danger">{error}</Alert>}
             <div>
               <Form className='MobileLoginForm' onSubmit={handlerecoverymailSubmit} style={{ display: !flag ? "block" : "none" }}>
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
                   {validationerrors.email && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.email}</p>}

                  
                   
                   </div>
                 </div>
                 </div>
               
               <div >
                 <Button className='sendOtpButton' type="submit"  variant="primary">
                   Send Link to Email
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
             <Button className='signinwithemailbutton' onClick={ShowloginwithOTp}> Sign in with OTP</Button>
             </div>
             
             <p style={{marginTop:'20px'}}><a>Don't have an account yet?</a>&nbsp; &nbsp;<a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
         </div>

           </div>


      </div>

    </div> 

   </div> 
    </div>
    </>
  )
}
export default Login;





// <div>
// <h2>Password Reset</h2>
// <form onSubmit={handleSubmit}>
//   <div>
//     <label>Email:</label>
//     <input
//       type="email"
//       placeholder="Enter your email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//   </div>
//   <button type="submit">Reset Password</button>
// </form>
// {message && <p>{message}</p>}
// {error && <p style={{ color: 'red' }}>{error}</p>}
// </div>





// const Authenticateemailandpassword = async(e) =>{
//   e.preventDefault();
//   const values={email,password};
// const validationErrors = validation(values,['email','password']);
// if(!(validationErrors.email)== '' || !(validationErrors.password)=='' )
// {
//   setValidationErrors(validationErrors);
//   alert('lg val er mail' + validationErrors.email);
//   alert('lg val er pas' + validationErrors.password);
//   return;
// }
// // const url = "https://localhost:7041/api/Login/GetUserByEmails";
//   const url = "https://localhost:7041/api/Login/GetUserByEmails";
//   const data={
//     userId: 0,
//     userTypeId: 0,
//     username: email,
//     password: password,
//     firstname: "string",
//     lastname: "string",
//     mobile: "string",
//     email: email,
//     isActive: true,
//     userFound: true,
//     resultMessage: "string"
//   }
//   try {

//     const response = await axios.post(url, data);
//     console.log(response.data);
//     if (response.status === 200) 
//     {

//         const sendData = 
//         {
//           userId: response.data.userId,
//           userTypeId: response.data.userTypeId,
//           username: response.data.username,
//           firstName: response.data.firstname,
//           lastName: response.data.lastname,
//           mobile: response.data.mobile,
//           email: response.data.email,
//           password:response.data.password,
//           userFound: response.data.userFound,
//         };
//         console.log(sendData);
//         if(sendData.userFound === true){
//           alert("hitted");
//           console.log("Before setIsUserLoggedIn: isUserLoggedIn =", isUserLoggedIn);
// setIsUserLoggedIn(true); // Set isUserLoggedIn to true
// console.log("After setIsUserLoggedIn: isUserLoggedIn =", isUserLoggedIn);
//           toast.success("user found by mail");
//           localStorage.setItem('isLoggedIn', 'true');
//           console.log("login2", JSON.parse(localStorage.getItem('isLoggedIn')));
//           // alert("login2", JSON.parse(localStorage.getItem('isLoggedIn')));
//           navigate('/home2');
//         }
//         else if(sendData.userFound === false){
//           alert("user didnt found");
//           toast.error("Invalid User");
//           return;
//         }
//         if(sendData)
//         {
//           localStorage.setItem('userdata', JSON.stringify(sendData));
//         }
//         const dummydata= JSON.parse(localStorage.getItem('userdata'));
//         console.log(dummydata);
//     } 
//     else 
//     {
//       setResultMessage("An unknown error occurred");
//     }
//   } catch(error) {
//     setResultMessage('An error occurred while processing your request.');
//     console.error(error);
//   }
// }
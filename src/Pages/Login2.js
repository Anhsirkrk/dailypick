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
import { useLoginAuth } from '../Components/UserAuthContext';
import UerRegistrationPage from '../Pages/Regisatrtion';
import Popup from './PopUp';

const Login = ({}) => {
  const {isLoginauthenticated, setIsLoginauthenticated}= useLoginAuth();
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
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);
  const [timerActive, setTimerActive] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginwithotpshow,setloginwithotpshow]= useState(true);
  const [loginwithemail,setloginwithemailshow]= useState(false);
  const [registrationform,setRegistrationForm]= useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [validationerrors,setValidationErrors]=useState('');

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

  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", loginwithotpshow);
  }, [loginwithotpshow,loginwithemail,registrationform,mobilenumber,isLoginauthenticated,setIsLoginauthenticated]);

  const resendOTP = () => {
    alert("hitted");
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

  const Authenticateemailandpassword = async(e) =>{
    e.preventDefault();
    const values={email,password};
  const validationErrors = validation(values);

  if(!(validationErrors.email)== '' || !(validationErrors.password)=='' )
  {
    setValidationErrors(validationErrors);
    alert('lg val er mail' + validationErrors.email);
    alert('lg val er pas' + validationErrors.password);
    return;
  }
  alert("validatiions pass");
    const url = "https://localhost:7041/api/Login/GetUserByEmail";
    const data={
      userId: 0,
      userTypeId: 0,
      username: email,
      password: password,
      firstname: "string",
      lastname: "string",
      mobile: "string",
      email: email,
      isActive: true,
      userFound: true,
      resultMessage: "string"
    }
    try {
      alert("here");
      const response = await axios.post(url, data);
      console.log(response.data);
      if (response.status === 200) 
      {
        alert("satus 200");
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
      
            toast.success("user found by mail");
            setIsLoginauthenticated(true);
            localStorage.setItem('isLoggedIn', 'true');
            console.log("login2", JSON.parse(localStorage.getItem('isLoggedIn')));
            alert("login2", JSON.parse(localStorage.getItem('isLoggedIn')));
            navigate('/home2');
          }
          else if(sendData.userFound === false){
            alert("user didnt found");
            toast.error("Invalid User");
          }
          if(sendData)
          {
            localStorage.setItem('userdata', JSON.stringify(sendData));
          }
          const dummydata= JSON.parse(localStorage.getItem('userdata'));
          console.log(dummydata);
      } 
      else 
      {
        setResultMessage("An unknown error occurred");
      }
    } catch(error) {
      setResultMessage('An error occurred while processing your request.');
      console.error(error);
    }
  }
  const verifymobilenumber = async (e) => {
    alert(mobilenumber);
    e.preventDefault();
    const values={mobilenumber};
    console.log(values);
  const validationErrors = validation(values);
  console.log(validationErrors);
  if(!(validationErrors.mobilenumber)=='')
  {
    setValidationErrors(validationErrors);
    alert(validationErrors.mobilenumber);
    console.log(validationerrors.mobilenumber);
    return;
  }
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
        alert("satus 200");
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
            alert("user found redirecting to otp gen");
            getOtp(mobilenumber);
            toast.success("user found redirecting to otp gen");
          }
          else if(sendData.userFound === false){
            alert("user   not found");
            toast.error("Invalid User");
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
        alert("getresendOtp");
        console.log(mobilenumber);
        setError("");
        if (mobilenumber === "" || mobilenumber === undefined){
        alert("num is invalid or undefined");
          return setError("Please enter a valid phone mobilenumber!");
        }
        try {
          alert("hitted try");
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
          setIsLoginauthenticated(prevState => {
            console.log('Before setting authenticated:', prevState);
            return true;
          });
          setIsLoginauthenticated(true);
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
  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", loginwithotpshow);
  }, [setIsLoginauthenticated,isLoginauthenticated]);

  return (
<>
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
     
       {/* Sign in with OTP Code */}
        <div className='LoginBox_container' style={{ display: loginwithotpshow ? "block" : "none" }}>
      <div className='Login_contant'>
        <div className='LoginContainerHeader'>
        <center>
            <h3 >Login with <span style={{ fontWeight: "bold" }}>OTP</span></h3>
            <ToastContainer/>
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
              <Form className='MobileLoginForm' onSubmit={Authenticateemailandpassword} style={{ display: !flag ? "block" : "none" }}>
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


      </div>

    </div> 

   </div> 
    </div>
    </>
  )
}
export default Login;



  //  const [currentPage, setCurrentPage] = useState('LoginWithemailid');
  //  const [mdcurrentPage, setMDCurrentPage] = useState('subscription');

  // axios.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     const { status, data } = error.response;

  //     switch (status) {
  //       case 401:
  //         setResultMessage('Unauthorized request error');
  //         break;
  //       case 403:
  //         setResultMessage('Forbidden request error');
  //         break;
  //       case 404:
  //         setResultMessage('Not found error');
  //         break;
  //       default:
  //         setResultMessage('Unknown error occurred');
  //     }

  //     return Promise.reject(error);
  //   }
  // );


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

   {/*const Signinwithemailcodedis =(e)=>{
    return(
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
    )
  } */}




 //     switch (userData.status) {
  //       case 200:
  //         const userFound = userData.data.userFound;
  //         if (userFound) {
  //           const sendData = {
  //             userId: userData.data.userId,
  //             userTypeId: userData.data.userTypeId,
  //             username: userData.data.username,
  //             firstName: userData.data.firstName,
  //             lastName: userData.data.lastName,
  //             mobile: userData.data.mobile,
  //             email: userData.data.email,
  //             userFound: userData.data.userFound,
  //           };
  //           localStorage.setItem('userdata', JSON.stringify(sendData));
  //           // Add your logic for user found scenario
  //         } 
  //         else 
  //         {
  //           setResultMessage('User not found');
  //           // Add your logic for user not found scenario
  //         }
  //         break;
  //       case 404:
  //         setResultMessage('User not found');
  //         break;
  //       default:
  //         setResultMessage('Unknown error occurred');
  //     }
  //   } catch (error) {
  //     setResultMessage('An error occurred while processing your request.');
  //     console.error(error);
  //   }
  // }


//   const verifymobilenumber=async (e)=>{
//     e.preventDefault();
//     const url = 'https://localhost:7041/api/Login/GetUserByMobileNumber';
//     const data = {
//       userId: 0,  // Assuming these properties are required
//     userTypeId: 0,
//     username: "",
//     password: "",
//     firstname: "",
//     lastname: "",
//     mobile: mobilenumber,  // Make sure 'number' is correctly set
//     email: "",
//     isActive: true,
//     userFound: true,
//     resultMessage: ""
//     }
//     axios.post(url, data)
//     .then((response) => {
//       const { data } = response;
//       console.log(data);

//       switch (response.status) {
//         case 200:
//           const { userFound } = data;

//           if (userFound) {
//             const senddata = {
//               userId: data.userId,
//               userTypeId: data.userTypeId,
//               username: data.username,
//               firstname: data.firstname,
//               lastname: data.lastname,
//               mobile: data.mobile,
//               email: data.email,
//               userFound: data.userFound,
//             };
//             localStorage.setItem('userdata', JSON.stringify(senddata));
//             // Add your logic for user found scenario
//           } else {
//             setResultMessage('User not found');
//             // Add your logic for user not found scenario
//           }
//           break;
//         case 404:
//           setResultMessage('User not found');
//           break;
//         default:
//           setResultMessage('Unknown error occurred');
//       }
//     })
//     .catch((error) => {
//       setResultMessage('An error occurred while processing your request.');
//       console.error(error);
//     });
// };


//     alert('verify mobile nu hitted ');
//     console.log(data);
//     axios.post(url,data)
// .then((result)=>{
//   console.log(result.data);
//  switch (result.status){
//   case 200 : 
//   const senddata = {
//     userId:result.data.userId,
//     userTypeId:result.data.userTypeId,
//     username:result.data.username,
//     firstname:result.data.firstname,
//     lastname:result.data.lastname,
//     mobile:result.data.mobile,
//     email:result.data.email,
//     userFound:result.data.userFound,
//   }
//   localStorage.setItem('userdata', JSON.stringify(senddata));
//   getOtp(mobilenumber);
//   break;
//   case 400 :
//     setResultmessage(result.data.ResultMessage);
//   case 404:
//     setResultmessage("user not found");
//     break;
//     default :
//     setResultmessage("unknown error occured");
//  }
// }).catch((error)=>{
//   setError("mobile number not regsitered");
//   console.log(error);
// })
//   };

//   if(result.status===200)
//   {
//     const senddata={
//       userId:result.data.userId,
//       userTypeId:result.data.userTypeId,
//       username:result.data.username,
//       firstname:result.data.firstname,
//       lastname:result.data.lastname,
//       mobile:result.data.mobile,
//       email:result.data.email,
//       userFound:result.data.userFound,
//     }
//     console.log(senddata);
//         localStorage.setItem('userdata', JSON.stringify(senddata)); 
//         getOtp(mobilenumber);   
//   }
//   else
//     {
//        setResultmessage("Not a valid User - please do register");
//        console.log(resultmessage);
//     }
//   })
// .catch((error)=>{
//   setError("mobile nu not resgitered");
//   console.log(error);
//    toast.success("Invalid User");
// });

//   }
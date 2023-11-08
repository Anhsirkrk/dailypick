import React, { useState,useEffect }  from 'react';
import '../Css/Login2.css';
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import axios, { formToJSON } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast } from 'react-toastify';
import validation from '../Components/validations';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import from Firebase SDK



const Regisatrtion = () => {


  const [error, setError] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [name,setName]=useState("");

  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const [flag, setFlag] = useState(false);
  const [ismobilenumberexist,setIsMobileNumberExist]=useState(false);
  const [isemailexist,setIsmailExist]=useState(false);
  const [resultMessage, setResultMessage] = useState(""); // Define setResultMessage
  

  const navigate = useNavigate();

  const [timer, setTimer] = useState(5);
  const [timerActive, setTimerActive] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginwithotpshow,setloginwithotpshow]= useState(true);
  const [loginwithemail,setloginwithemailshow]= useState(false);
  const [regisitrationForm,setRegisatrtionFormShow]= useState(false);
  
  const [validationerrors,setValidationErrors]=useState({});


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
  }, [loginwithotpshow,loginwithemail,regisitrationForm,isemailexist,ismobilenumberexist,setIsmailExist,setIsMobileNumberExist]);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const registerUser = async () => {
    alert("firabse reg user hited");
  

    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("user reg in fb");
      const user = userCredential.user;
      console.log("User registered successfully:", user);
      // Redirect to a success page or perform other actions as needed.
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };
  

  const validateemail= async(email)=>{
    const values ={email}
    const validationErrors = validation(values,['email']);
    console.log(validationErrors.email);
    setValidationErrors((prevState) => ({
      ...prevState,
      email: validationErrors.email,
    }));
  }
  const validatemobile= async(mobilenumber)=>{
    const values ={mobilenumber}
    const validationErrors = validation(values,['mobilenumber']);
    console.log(validationErrors.mobilenumber);
    setValidationErrors((prevState) => ({
      ...prevState,
      mobilenumber: validationErrors.mobilenumber,
    }));
  }
  

  const checkemailexists = async (email) => {
    alert("checkinmg  email ")
    const url = 'https://localhost:7041/api/Login/GetUserByEmails';
    const data = {
      userId: 0,
      userTypeId: 0,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
      email: email,
      isActive: true,
      userFound: true,
      resultMessage: ""
    };
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      if (response.status === 200) 
      {
        //alert("email data checked");
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
          if(sendData.userFound === true)
          {
            //alert("email  already exists");
            //toast.error("email already exists");
            setValidationErrors(prevState => ({
                    ...prevState,
                    email: "email  already exists"
                  }));
                return true;
          }
          else if(sendData.userFound === false)
          {
            return false;
          }
      } 
      else 
      {
        //alert("got error while checking email");
        return null;
      }
    }
     catch(error) {
      //alert("got error while checking email");
      setResultMessage('An error occurred while processing your request.');
      console.error(error);
      return null;
    }
  
  };

  const checkmobilenumberexists = async (mobilenumber) => {
    alert("checking mobile number");
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
        //alert("mobile number checked");
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
          if(sendData.userFound === true)
          {
            //alert("mobile number already exists");
            toast.error("mobile number already exists");
            setValidationErrors(prevState => ({
                    ...prevState,
                    mobilenumber: "Mobile number already exists"
                  }));
                return true;
          }
          else if(sendData.userFound === false)
          {
            //alert("mobile nmumber is new");
            return false;
          }
      } 
      else 
      {
        //alert("got error whilo echecking mob number");
        return null;
      }
    }
     catch(error) {
      //alert("got error whilo echecking mob number");
      setResultMessage('An error occurred while processing your request.');
      console.error(error);
    }
  
  };
  
  const UserRegistration = async (e)=>{
    alert("user reg hitted");
      e.preventDefault();
      alert("user reg hitted");
      const values={name,email,mobilenumber,password,confirmpassword};
      //alert("check console 243 for values");
      console.log(values);
      const validationErrors = validation(values,['name','email','mobilenumber','password','confirmpassword']);

    console.log(validationErrors);
   
    if(Object.keys(validationErrors).length>0)
    {
     
      setValidationErrors(validationErrors);
      console.log(validationerrors.mobilenumber);
      return;
    }

   var numberexists= await checkmobilenumberexists(mobilenumber);
   if(numberexists === true)
   {
        //toast.error("mobile number exists");
        alert("mobile number already exists");
        validationerrors.mobilenumber ="Mobile number already exists";
       // alert(`valerr mob:${validationerrors.mobilenumber}`);
        setIsMobileNumberExist(true);
        return;
   }
   else if(numberexists === false)
   {
    //toast.success("mobile number is new");
     alert("mobile number is new");
      setIsMobileNumberExist(false);
   }
   var emailexists = await checkemailexists(email);
   if(emailexists === true)
   {
    toast.error("email exists");
        alert('isemailexist');
        validationerrors.email ="email already exists";
        //alert(`valerr mob:${validationerrors.email}`);
        setIsmailExist(true);
        return;
    }
    else if( emailexists === false)
    {
      //toast.success("email is new");
      alert("email is new "); 
      setIsmailExist(false);
    }
    else if(emailexists === null)
    {
      //toast.error("got error while checking email")
      alert("got error while checking email"); 
      setResultMessage('An error occurred while processing your request.');
      return;
    }
   alert(`isemailexist${isemailexist}`);
    alert(`ismobileexist${ismobilenumberexist}`);
 alert("here1");
 console.log(isemailexist, ismobilenumberexist) ;
 if(isemailexist === false && ismobilenumberexist === false )
 {
  alert("enter for axios");
   try {
     alert("entered to createuser");
     const url = 'https://localhost:7041/api/User/CreateUser';
     const data = {
       userId: 0,
       userTypeId:'1',
       username: email,
       password: password,
       firstname: name,
       lastname: 'null',
       mobile:mobilenumber,
       email:email,
       isActive:true,
       userFound:true,
       resultMessage:"",
       isusercreated:true
     };
 
     const response = await axios.post(url, data);
     console.log(response.data);
 
     if (response.status === 200) 
     {
      alert("axios 200");
       const recieveddata = 
       {
         isusercreated: response.data.isusercreated,
         resultMessage:response.data.resultMessage
       };
       console.log(recieveddata);
 
       if(recieveddata.isusercreated === true)
       {
        alert("going for fb reg user");
        registerUser();
         toast.success(recieveddata.resultMessage);

         navigate('/Login2');
       }
       else if(recieveddata.isusercreated === false)
       {
        alert("user reg axios faileed");
         toast.error(recieveddata.resultMessage);
         setError("Account creation was not successful, Try again Later");
       }
     } 
     else 
     {
      alert("user reg axios else faileed");

       setResultMessage("An unknown error occurred");
     }
   } 
   catch(error)
    {
      alert("user reg axios catch faileed");

     setResultMessage('An error occurred while processing your request.');
     console.error(error);
   }
 }
 
   }
  

  return (
    <>
    <div className='RegistartionBox_container' >
    <div className='Login_contant'>
      <div className='LoginContainerHeader'>
      <center>
          <h3 style={{marginTop:'2px'}} >Create an   <span style={{ fontWeight: "bold" }}>Account</span></h3>
          </center>
      </div>
      <ToastContainer/>
      <div className='Login2-form'>
      <div className="p-4 box">
      {error && <Alert variant="danger">{error}</Alert>}
        <div>
          <Form className='MobileLoginForm' onSubmit={UserRegistration} style={{ display: !flag ? "block" : "none" }}>
            <p>Enter your Name</p>
            <div className='nameinputdiv'>
              <input 
              type='text'
              className='name-input'
              placeholder="Enter name"
              value={name}
              onChange={e=>setName(e.target.value)}
              />
              {validationerrors.name && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.name}</p>}

            </div>
            <p>Enter Email</p>
            <div className='emailinputdiv'>
              <input 
              type='email'
              className='email-input'
              placeholder="Enter Email"
              value={email}
              onChange={e=>{setEmail(e.target.value); validateemail(e.target.value);}}
              />
              {validationerrors.email && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.email}</p>}

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
                  value={mobilenumber}
                  onChange={e=>{setMobileNumber(e); validatemobile(e);}}
                  
                  maxLength={11}
                  />
                </div>
            </div>
            {validationerrors.mobilenumber && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.mobilenumber}</p>}

            <p>Enter password</p>
            <div className="password-input-container">
              <input
              type={passwordVisible ? "text" : "password"}
              className='password-input'
              placeholder="Enter password "
              value={password}
              onChange={e=>setPassword(e.target.value)}
                />

                <span onClick={togglePasswordVisibility} className="regform-confirmpassword-icon">
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                </span>
                </div>
                {validationerrors.password && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.password}</p>}

                <p>Confirm password</p>
                <div className="confirmpassword-input-container">
                  <input
                  type={passwordVisible ? "text" : "password"}
                  className='confirmpassword-input'
                  placeholder="Enter password "
                  value={confirmpassword}
                  onChange={e=>setConfirmPassword(e.target.value)}
                    />
                    <span onClick={togglePasswordVisibility} className="regform-confirmpassword-icon">
                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                    </span>
                    </div>
                    {validationerrors.confirmpassword && <p  className='AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.confirmpassword}</p>}
  
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
     
</div> 
</>
  )
}

export default Regisatrtion
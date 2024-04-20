import React, { useState,useEffect}  from 'react';
import '../Css/SupplierLogin.css';
import supplierloginimage from '../Images/logocover.png';
import { Form, Alert } from "react-bootstrap";
import {ToastContainer,toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validation from '../Components/validations';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import UerRegistrationPage from '../Pages/Regisatrtion';


const SupplierLogin = () => {
  const [loginwithemail,setloginwithemailshow]= useState(true);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [validationerrors,setValidationErrors]=useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordresetshow,setPasswordResetShow]=useState(false);
  const [registrationform,setRegistrationForm]= useState(false);


  const showloginwithEmail = () => {
    setloginwithemailshow(prevState => { 
      return true;
    });
    
    setPasswordResetShow(prevState => {  
      return false;
    });

    setRegistrationForm(prevState => {
      return false;
    });
   
  };

  const showregistartionform =()=>{
    setRegistrationForm(prevState => {   
      return true;
    });
    
    setloginwithemailshow(prevState => { 
      return false;
    });
    
    setPasswordResetShow(prevState => { 
      return false;
    });
      
      
  };

  const showpasswordresetform =()=>{
    setPasswordResetShow(prevState => {
      return true;
    });
    
    setloginwithemailshow(prevState => {
      return false;
    });
    
    setRegistrationForm(prevState => {
      return false;
    });
    

  };

  return (
    <>
    <ToastContainer/>
    <div className='Sp-login-page'>
      <div className='Sp-login-container'>
        <div className='Sp-login-left'>
          <div className='Sp-login-heading'>
            <h2>Supply the Needs</h2>
          </div>
          <img className='Sp-login-image' src={supplierloginimage} alt='Supplier login image'/>
        </div>
        <div className='Sp-login-right'>
          <div className='Sp-login-page-container'>
            <div className='Sp-login-page-box'>
              {/* Sign in with email Code  */}
            <div className='Sp-LoginBox_container'  style={{ display: loginwithemail ? "block" : "none" }} >
            <div className='Sp-Login_contant'>
              <div className='Sp-LoginContainerHeader'>
              <center>
                  <h3 >Login with <span style={{ fontWeight: "bold" }}>Email</span></h3>
                  </center>
              </div>
      
              <br></br>
              <div className='Sp-Login2-form'>
              <div className="Sp-p-4 box">
              {error && <Alert variant="danger">{error}</Alert>}
                <div>
                  <Form className='Sp-MobileLoginForm' style={{ display: !flag ? "block" : "none" }}>
                    <p>Enter Email</p>
                    <div style={{display:'flex'}}>
                    
                    <div className='Sp-phoneinputdiv'>
                      <div className=''>
                      <input
                      type='email'
                      className='Sp-email-input'
                      placeholder="Enter registered MailID"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      />
                      {validationerrors.email && <p  className='Sp-AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.email}</p>}

                      <p>Enter Password</p>
                      <div className="Sp-password-input-container">
                      <input
                      type={passwordVisible ? "text" : "password"}
                      className='Sp-password-input'
                      placeholder="Enter password "
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                        />
                        {validationerrors.password && <p  className='Sp-AdminUserRegform-group-errors-p'style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.password}</p>}
                        <span  className="Sp-password-icon">
                        <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                        </span>
                        </div>
                      
                      </div>
                    </div>
                    </div>
                    <div id="recaptcha-container"></div>
                  
                 
                  <a onClick={showpasswordresetform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Forgot Password</a>
                </Form>
              </div>  
            </div>
              </div>
              </div>
              <div className='Sp-LoginConatiner_Bottomdiv'>
                <div className='Sp-ORdiv'>
                <p >------------------------ OR -----------------------</p>
                </div>
                
                <p style={{marginTop:'20px'}}><a>Don't have an account yet?  </a><a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
            </div>
      
            </div>
           {/* password reset show  Code */}
           <div className='LoginBox_container'style={{ display:passwordresetshow  ? "block" : "none" }}  >

           <div className='Login_contant'>
           <div className='LoginContainerHeader'>
           <center>
               <h3 >Recover Password <span style={{ fontWeight: "bold" }}></span></h3>
               </center>
           </div>
   
           <br></br>
           <div className='Login2-form'>
           <div className="p-4 box">

           {error && <Alert variant="danger">{error}</Alert>}
             <div>
               <Form className='MobileLoginForm'  style={{ display: !flag ? "block" : "none" }}>
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
               
               
             </Form>
           </div>  
         </div>
           </div>
           </div>
           <div className='LoginConatiner_Bottomdiv'>
             <div className='ORdiv'>
             <p >------------------------ OR -----------------------</p>
             </div>
             
             
             <p style={{marginTop:'20px'}}><a>Don't have an account yet?  </a><a onClick={showregistartionform} style={{ color:'#024172',textDecoration:'underline', fontWeight:'bold'}}>Register for Free</a></p>
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
               <Button className='Regpage-signinwithEmailbutton' onClick={showloginwithEmail}> sign in with password</Button>
         
               </div>
               
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

export default SupplierLogin

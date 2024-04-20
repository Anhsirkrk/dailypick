import React, { useState,useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';
import validation from '../Components/validations';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast } from 'react-toastify';


const ProfileDetails = () => {



  const [userId, setUserId]=useState('');
  const[userTypeId,setUserTypeId]=useState('')
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');
  const [updatedFirstname, setUpdatedFirstname] = useState('');
  const [updatedLastname, setUpdatedLastname] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const[isActive,setIsActive]=useState('')


  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [error, setError] = useState(null);

  const [validationerrors,setValidationErrors]=useState({});

  const [ismobilenumberexist,setIsMobileNumberExist]=useState(false);
  const [isemailexist,setIsmailExist]=useState(false);
  const [resultMessage, setResultMessage] = useState(""); // Define setResultMessage

  const token = localStorage.getItem('token');
  console.log("from getdailyneed",token);
  //alert(token);
  const bearer = `bearer` + " " + token;
  const tokenStartIndex = 8; // Assuming the token starts after "bearer "
  const formattedBearer = `bearer`+ " "+ bearer.substring(tokenStartIndex, bearer.length - 1); // Remove the last character (quote)
  
  
  //alert(formattedBearer);
  console.log(formattedBearer);
  

  useEffect(() => {
    // Get item from local storage on component mount
    console.log('isEditMode:', isEditMode);
    const receivedData = localStorage.getItem('userdata');
    const parsedData = JSON.parse(receivedData);
    console.log(parsedData);
    if (parsedData) {
      setUserId(parsedData.userId,);
    }
    GetUserdetails();
  }, [userId]);
  
 

  const GetUserdetails = async () => {
    try {
      console.log(userId);
      const response = await axios.get(
        `https://localhost:7041/api/User/GetUserDetailsByUserId`,
        {
          params: {
            userId: userId,
          },
          headers: {
            'Authorization': formattedBearer,
            'Content-Type': 'application/json',
            // Add other necessary headers
          },
        }
      );
  
      if (response.status === 200) {
        setUserTypeId(response.data.userTypeId);
        setUpdatedUsername(response.data.username);
        setUpdatedPassword(response.data.password);
        setUpdatedFirstname(response.data.firstname);
        setUpdatedLastname(response.data.lastname);
        setUpdatedEmail(response.data.email);
        setUpdatedMobile(response.data.mobile);
        setIsActive(response.data.isActive);
      }
      console.log(updatedFirstname);
      console.log(updatedLastname);
      console.log(updatedUsername);
      console.log(updatedPassword);
      console.log(updatedMobile);
      console.log(updatedEmail);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Call the API to update user details
      await updateUserDetails();
      // After successful save, exit edit mode

//receivedData.firstname=updatedFirstname;
      setIsEditMode(false);
      // Show a success message or update UI as needed
      //After Sucessful updation we he to get the user new details
    } catch (error) {
      // Handle API errors, show error message to the user
      setError('Failed to update user details. Please try again later.');
      console.error('Error updating user details:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateUserDetails = async () => {
    
if (updatedUsername!==updatedMobile){
  var numberexists= await checkmobilenumberexists(updatedMobile);
}
      
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
   if (updatedUsername!==updatedEmail){
    var emailexists = await checkemailexists(updatedEmail);
  }

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
    if(isemailexist === false && ismobilenumberexist === false )
    {
      try {
      const response = await axios.post(
        `https://localhost:7041/api/User/UpdateUserDetails`,
        {
          userId:userId,
          userTypeId:userTypeId,
          email: updatedEmail,
          mobile: updatedMobile,
          ResultMessage: 'Success',
          lastname: updatedLastname, // Add these lines to include required fields
          Password: updatedPassword,
          Username: updatedUsername,
          firstname: updatedFirstname,
          isActive:isActive
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('User details updated successfully:', response.data);
        const UpdatedData = 
        {
          userId:userId,
          userTypeId:userTypeId,
          email: updatedEmail,
          mobile: updatedMobile,
          ResultMessage: 'Success',
          lastname: updatedLastname, // Add these lines to include required fields
          Password: updatedPassword,
          Username: updatedUsername,
          firstname: updatedFirstname,
          isActive:isActive
        };
        // localStorage.removeItem('userdata');
        console.log(UpdatedData);
        const recieveddata = localStorage.getItem('userdata');
        console.log("nav : storeddata",recieveddata);
        if(recieveddata){
          const userdata=JSON.parse(recieveddata); 
          userdata.userId=userId;   
          userdata.userTypeId=userTypeId;
          userdata.username=updatedUsername;
          userdata.firstName=updatedFirstname;
          userdata.lastName=updatedLastname;
          userdata.email=updatedEmail;
          userdata.mobile=updatedMobile;
          userdata.isActive=isActive;

          localStorage.setItem('userdata',JSON.stringify(userdata));

        }
        else{
          console.log('no userdata found in local storage')
        }


        
      } else {
        console.error('Failed to update user details:', response.data);
      }
    } catch (error) {
      setError('Error updating user details. Please try again later.');
      console.error('Error updating user details:', error);
    }
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
  };

  const validatemobile= async(mobilenumber)=>{
    const values ={mobilenumber}
    const validationErrors = validation(values,['mobilenumber']);
    console.log(validationErrors.mobilenumber);
    setValidationErrors((prevState) => ({
      ...prevState,
      mobilenumber: validationErrors.mobilenumber,
    }));
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


  return (
    <div>
      <ToastContainer/>
      <div className='profile-top'>
        <div className='heading-bar'>
          <h2 className='profile-head'> Profile</h2>
          <button type="button" className="edit-btn" onClick={() => setIsEditMode(!isEditMode)}>
            <BiEdit /> {isEditMode ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <hr></hr>
        <form className='profile-form' onSubmit={handleFormSubmit}>
          <div className='profile-first-row'>
            <div>
              <label htmlFor="name">FirstName</label><br></br>
              <input type="text" className="profile-textbox" name="firstname" value={updatedFirstname} onChange={(e) => setUpdatedFirstname(e.target.value)}  disabled={!isEditMode} />
            </div>
            <div>
              <label htmlFor="name">LastName</label><br></br>
              <input type="text" className="profile-textbox" name="lastname" value={updatedLastname} onChange={(e) => setUpdatedLastname(e.target.value)} disabled={!isEditMode} />
            </div>
          </div>
          <br></br>
          <div className='profile-first-row'>
          <div>
              <label htmlFor="email">Email</label><br></br>
              <input type="email" className="profile-textbox" name="email" value={updatedEmail} onChange={(e) => {setUpdatedEmail(e.target.value); validateemail(e.target.value);}}  disabled={!isEditMode} />
            </div>
            <div>
            <label htmlFor="phone">Mobile Number</label><br></br>
            <input type="text" className="profile-textbox" name="mobile" value={updatedMobile} onChange={(e) => {setUpdatedMobile(e.target.value); validatemobile(e.target.value);}}  disabled={!isEditMode} />
          </div>
          </div>
          <br></br>
          <div className='profile-first-row'>
          <div>
              <label htmlFor="password">Password</label><br></br>
              <input type="password" className="profile-textbox" name="password" value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} disabled={!isEditMode} />
            </div>
            <div>
            <label htmlFor="username">Username</label><br></br>
            <input type="text" className="profile-textbox" name="username" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} disabled={!isEditMode} />
          </div>
          </div>
          <div className='profile-save-btn-div'>
            {isEditMode && <button type="submit" className="profile-save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>}
          </div>
        </form>
       
      </div>
    </div>
  )
}

export default ProfileDetails


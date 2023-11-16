import React, { useState,useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';


const ProfileDetails = () => {


  const [userData, setUserData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    userTypeId: '',
    username: '',
    password: '',
  });

  // const [userId, setUserId]=useState('');
  // const [firstName,setFirstName]=useState('');
  // const [email,setEmail]=useState('');
  // const [mobile,setMobile]=useState('');     
  // const [userTypeId,setUserTypeId]=useState('');
  // const [username,setUsername]=useState('');
  // const [password,setPassword]=useState('');
  // const [lastName,setLastName]=useState('');


  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');
  const [updatedFirstname, setUpdatedFirstname] = useState('');
  const [updatedLastname, setUpdatedLastname] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');



  const [isLoading, setIsLoading] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [error, setError] = useState(null);
  const [storeddata, setStoreddata] = useState(null);  // Declare storeddata




  useEffect(() => {
    setUpdatedEmail(userData.email);
    setUpdatedMobile(userData.mobile);
    setUpdatedFirstname(userData.firstName);
    setUpdatedLastname(userData.lastName);
    setUpdatedUsername(userData.username);
    setUpdatedPassword(userData.password);
  }, [userData.email, userData.mobile,userData.firstName,userData.lastName,userData.username,userData.password]);

  // useEffect(() => {
  //   setUpdatedEmail(email);
  //   setUpdatedMobile(mobile);
  // }, [email, mobile]);

 


  useEffect(() => {
    // Get item from local storage on component mount
    console.log('isEditMode:', isEditMode);
    const receivedData = localStorage.getItem('userdata');
    const parsedData = JSON.parse(receivedData);
    console.log(parsedData);
    if (parsedData) {
      setUserData({
        userId: parsedData.userId,
        firstName: parsedData.firstName || '', // Provide default values or handle null values
        lastName: parsedData.lastName || '',
        email: parsedData.email || '',
        mobile: parsedData.mobile || '',
        userTypeId: parsedData.userTypeId || '',
        username: parsedData.username || '',
        password: parsedData.password || '',
      });
    }
  }, [isEditMode]);
  

  // useEffect(() => {
  //   // Get item from local storage on component mount
  //   console.log('isEditMode:', isEditMode);
  //   const receivedData = localStorage.getItem('userdata');
  //   const parsedData = JSON.parse(receivedData);
  //   console.log(parsedData);
  //   if (parsedData) {
  //     setFirstName(parsedData.firstName);
  //     setMobile(parsedData.mobile);
  //     setEmail(parsedData.email);
  //     setUserId(parsedData.userId);
  //     setUserTypeId(parsedData.userTypeId);
  //     setUsername(parsedData.username);
  //     setPassword(parsedData.password);
  //     setLastName(parsedData.lastName);  
  //   }
  // }, [isEditMode]);



  const updateUserDetails = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7041/api/User/UpdateUserDetails`,
        {
          ...userData,
          email: updatedEmail,
          mobile: updatedMobile,
          ResultMessage: 'Success',
          Lastname: updatedLastname, // Add these lines to include required fields
          Password: updatedPassword,
          Username: updatedUsername,
          Firstname: updatedFirstname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('User details updated successfully:', response.data);
        const updatedData = { ...userData, email: updatedEmail, mobile: updatedMobile };
        setUserData(updatedData);
        localStorage.setItem('userdata', JSON.stringify(updatedData));
      } else {
        console.error('Failed to update user details:', response.data);
      }
    } catch (error) {
      setError('Error updating user details. Please try again later.');
      console.error('Error updating user details:', error);
    }
  };



  // const updateUserDetails = async () => {
  //   try {
  //     const response = await axios.post(
  //       `https://localhost:7041/api/User/UpdateUserDetails`,
  //       {
  //         userId: userId,
  //         userTypeId: userTypeId,
  //         username: username,
  //         password: password,
  //         email: updatedEmail,
  //         mobile: updatedMobile,
  //         firstName: firstName,
  //         lastName: lastName,
  //         ResultMessage: 'Success',
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       console.log('User details updated successfully:', response.data);
  //       const updatedData = { ...storeddata, email: updatedEmail, mobile: updatedMobile, firstName, lastName };
  //       localStorage.setItem('userdata', JSON.stringify(updatedData));
  //     } else {
  //       console.error('Failed to update user details:', response.data);
  //     }
  //   } catch (error) {
  //     setError('Error updating user details. Please try again later.');
  //     console.error('Error updating user details:', error);
  //   }
  // };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Call the API to update user details
      await updateUserDetails();

      // After successful save, exit edit mode
      setIsEditMode(false);
      // Show a success message or update UI as needed
    } catch (error) {
      // Handle API errors, show error message to the user
      setError('Failed to update user details. Please try again later.');
      console.error('Error updating user details:', error);
    } finally {
      setIsSaving(false);
    }
  };




  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSaving(true);
  //   try {
  //     // Call the API to update user details
  //     await updateUserDetails();
      
  //     // After successful save, exit edit mode
  //     setIsEditMode(false);
  //     // Show a success message or update UI as needed
  //   } catch (error) {
  //     // Handle API errors, show error message to the user
  //     setError('Failed to update user details. Please try again later.');
  //     console.error('Error updating user details:', error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  

  return (
    <div>
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
              <input type="text" className="profile-textbox" name="firstname" value={updatedFirstname} onChange={(e) => setUpdatedFirstname(e.target.value)} disabled={!isEditMode} />
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
              <input type="email" className="profile-textbox" name="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} disabled={!isEditMode} />
            </div>
            <div>
            <label htmlFor="phone">Mobile Number</label><br></br>
            <input type="text" className="profile-textbox" name="mabile" value={updatedMobile} onChange={(e) => setUpdatedMobile(e.target.value)} disabled={!isEditMode} />
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






  // const updateUserDetails = async () => {
  //   try {
  //     const response = await fetch(`https://localhost:7041/api/User/UpdateUserDetails`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userId: userId,
  //         email: updatedEmail,
  //         mobile: updatedMobile,
  //       }),
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       console.log('User details updated successfully:', data);
  //     } else {
  //       console.error('Failed to update user details:', data);
  //     }
  //   } catch (error) {
  //     setError('Error updating user details. Please try again later.');
  //     console.error('Error updating user details:', error);
  //   }
  // };
  
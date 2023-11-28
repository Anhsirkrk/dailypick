import React, { useState,useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';


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
            'accept': 'text/plain',
            'Content-Type': 'application/json',
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
        
      } else {
        console.error('Failed to update user details:', response.data);
      }
    } catch (error) {
      setError('Error updating user details. Please try again later.');
      console.error('Error updating user details:', error);
    }
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
            <input type="text" className="profile-textbox" name="mobile" value={updatedMobile} onChange={(e) => setUpdatedMobile(e.target.value)} disabled={!isEditMode} />
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


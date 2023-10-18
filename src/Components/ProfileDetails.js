import React, { useState,useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';


const ProfileDetails = () => {


  const [userId, setUserId]=useState('');
  const [firstName,setFirstName]=useState('');
  const [email,setEmail]=useState('');
  const [mobile,setMobile]=useState('');
  const [userTypeId,setUserTypeId]=useState('');
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [lastName,setLastName]=useState('');


  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');


  const [isLoading, setIsLoading] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [error, setError] = useState(null);



  useEffect(() => {
    setUpdatedEmail(email);
    setUpdatedMobile(mobile);
  }, [email, mobile]);

 
  useEffect(() => {
    // Get item from local storage on component mount
    console.log('isEditMode:', isEditMode);
    const recieveddata = localStorage.getItem('userdata');
    const storeddata=(JSON.parse(recieveddata));
    console.log(storeddata);
    if (storeddata) {
      setFirstName(storeddata.firstName);
      setMobile(storeddata.mobile);
      setEmail(storeddata.email);
      setUserId(storeddata.userId);
      setUserTypeId(storeddata.userTypeId);
      setUsername(storeddata.username);
      setPassword(storeddata.password);
      setLastName(storeddata.lastName);  
    }
  }, [isEditMode]);


  const updateUserDetails = async () => {
    try {
      const response = await axios.post('https://localhost:7041/api/User/UpdateUserDetails', {
        userId: userId,
        userTypeId: userTypeId, // Include other required fields 
        username: username,
        Password: password, // Include the required fields
        email: updatedEmail,
        mobile: updatedMobile,
        firstName: firstName, // Include the required fields
        lastName: lastName, // Include other required fields
        ResultMessage: 'Success', 
      });

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
              <label htmlFor="name">Name</label><br></br>
              <input type="text" className="profile-textbox" name="name" value={firstName} readOnly />
            </div>
            <div>
              <label htmlFor="email">Email</label><br></br>
              <input
                type="email"
                className="profile-textbox"
                name="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                disabled={!isEditMode} // Make the input editable only in edit mode
              />
            </div>
          </div>
          <br></br>
          <div>
            <label htmlFor="phone">Mobile Number</label><br></br>
            <input
              type="text"
              className="profile-textbox"
              name="phone"
              value={updatedMobile}
              onChange={(e) => setUpdatedMobile(e.target.value)}
              disabled={!isEditMode} // Make the input editable only in edit mode
            />
          </div>
          <div className='profile-save-btn-div'>
            {isEditMode && <button type="submit" className="profile-save-btn" disabled={isSaving}>Save</button>}
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
  
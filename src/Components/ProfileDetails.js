import React, { useState,useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';

const ProfileDetails = () => {


  const [userid, setUserid]=useState('');
  const [firstName,setFirstname]=useState('');
  const [email,setEmail]=useState('');
  const [mobile,setMobile]=useState('');


  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');


const [isLoading, setIsLoading] = useState(false);

const [isSaving, setIsSaving] = useState(false);
const [isEditMode, setIsEditMode] = useState(false);

const [error, setError] = useState(null);




  useEffect(() => {
    // Get item from local storage on component mount

    console.log('isEditMode:', isEditMode);
    const recieveddata = localStorage.getItem('userdata');
    const storeddata=(JSON.parse(recieveddata));
    console.log(storeddata);
    if (storeddata) {
      setFirstname(storeddata.firstName);
      setMobile(storeddata.mobile);
      setEmail(storeddata.email);
      setUserid(storeddata.userid);
    }
  }, [isEditMode]);



  const updateUserDetails = async () => {
    try {
      const response = await fetch('https://localhost:7041/api/User/UpdateUserDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userid,
          email: updatedEmail,
          mobile: updatedMobile,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('User details updated successfully:', data);
      } else {
        console.error('Failed to update user details:', data);
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
                value={email}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                readOnly={!isEditMode} // Make the input editable only in edit mode
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
              value={mobile}
              onChange={(e) => setUpdatedMobile(e.target.value)}
              readOnly={!isEditMode} // Make the input editable only in edit mode
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
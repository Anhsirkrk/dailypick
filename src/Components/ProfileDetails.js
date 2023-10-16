import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

const ProfileDetails = () => {
  return (
    <div>
            <div className='profile-top'>
                <div className='heading-bar'>
                <h2 className='profile-head'> Profile</h2>
                <button type="button" className="edit-btn"><FiEdit2/>Edit</button>
                </div>
                <form className='profile-form'>
                    <label for="name">Name</label>
                    <input type="text" className="name" name="name" value="Raghu" readonly/>
                    <label for="phone">Phone No</label>
                    <input type="text" className="phone" name="phone" value="7780580000" readonly/>
                    <label for="email">Email Address</label>
                    <input type="email" className="email" name="email" value="Raghu@gmail.com" readonly/>    
                </form>
                 
            </div>
        </div>
  )
}

export default ProfileDetails
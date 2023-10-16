import React ,{useState} from 'react';
import Nav from '../Components/Nav';
import '../Css/Profile.css';
import ProfileDetails from '../Components/ProfileDetails';
import OrderHistory from '../Components/OrderHistory';
import Address from '../Components/Address';
import Security from '../Components/Security';
import ContactUs from '../Components/ContactUs'


const Profile = () => {

    const [contentType, setContentType] = useState('profiledetails');

    const renderContent = () => {
        switch (contentType) {
          case 'orderhistory':
            return <OrderHistory />;
          case 'address':
            return <Address />;
          case 'security':
            return <Security />;
          case 'contactus':
            return <ContactUs />;
          default:
            return <ProfileDetails />;
        }
      };



  return (
    <>
    <Nav/> 
      
      <div className='profile-page'>
        <div className='profile-heading'>
            <h2>My Account</h2>
        </div>
        <div className='profile-name'>
            <h4>Hello krishna</h4>
        </div>
        <div className='profile-container'>
            <div className='column-1'>
                <div className='account-list'>
                <div className='account-list-items' onClick={() => setContentType('profiledetails')}>Profile</div>
                <div className='account-list-items' onClick={() => setContentType('orderhistory')}>Order History</div>
                <div className='account-list-items' onClick={() => setContentType('address')}>Address</div>
                <div className='account-list-items' onClick={() => setContentType('security')}>Password & Security</div>
                <div className='account-list-items' onClick={() => setContentType('contactus')}>Contact Us</div>
                <div className='account-list-items'>LOG OUT</div>
                </div>
            </div>
            <div className='column-2'>
            {renderContent()}
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile

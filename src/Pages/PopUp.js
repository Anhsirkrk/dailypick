import React, { useState,useEffect }  from 'react';
import '../Css/PopUp.css'

const Popup = ({ }) => {

      
  const [showPopup, setShowPopup] = useState(true);
    
  const closePopup = () => {
    alert("close popup clicked");
    setShowPopup(prevShowPopup => {
      alert(prevShowPopup);
      alert("setting it to false");
      
      return false; // Setting the state to false
      alert(showPopup);
    });
  };

  useEffect(() => {
    alert(`showPopup is now ${showPopup}`);
  }, [showPopup]);

  const redirectToLogin = () => {
    window.location.href = '/login2';
    closePopup();
  }

  const continueAsGuest = () => {
    window.location.href = '/guest';
    closePopup();
  }

  return (


    <div style={{display:{showPopup}}} className="popup-background" >
    <div className='popup'>
      <button className='redirecttoLoginButton' onClick={redirectToLogin}>Login / Signup</button>
      <button className='redirecttoGuestButton' onClick={continueAsGuest}><span ><p style={{padding:'0px 0px 0px 0px',margin:'0px 0px 0px 0px'}}>Continue as</p><p style={{padding: '5 px 0px 0px 0px',margin: '0px 0px 0px 0px'}}>GUEST</p></span></button>
    </div>
    </div>
  );
}

export default Popup;

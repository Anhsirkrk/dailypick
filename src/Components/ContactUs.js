import React from 'react';
import {BiMessageRounded} from 'react-icons/bi';

const ContactUs = () => {
  return (
    <div>
      <div>
      <h2 className='Contact-head'> ContactUs</h2>
      </div>
      <hr></hr>
       <div>
       <p className='contact-tagline'>All Saved Address</p>
       </div>
       <div className='contact-email'>
        <div className='symbol'>@</div>
        <div>
          <div className='email'>Email</div>
          <p className='contact-email-name'>Dailypick@geddit.in</p>
        </div>
       </div>
       <div className='message'>
        <div className='symbol'><BiMessageRounded/></div>
        <div>
          <p className='message-name'>Chat with Us</p>
        </div>
       </div>
      
    </div>
  )
}

export default ContactUs
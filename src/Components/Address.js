import React,{useState,useEffect} from 'react';
import {BiCircle} from 'react-icons/bi';
import {TbCurrentLocation} from 'react-icons/tb';
import {TbEdit} from 'react-icons/tb';
import {RiDeleteBinLine} from 'react-icons/ri';
import locicon from '../Images/location.svg';
import {SlLocationPin} from 'react-icons/sl'

const Address = () => {

  const [userid, setUserId] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Define selectedAddressId state
  const [savedAddresses, setSavedAddresses] = useState([]); // Define savedAddresses state

  const receivedData = localStorage.getItem('usersavedaddress');
  const savedAddressesData = JSON.parse(receivedData) || [];

  useEffect(() => {
    // Fetch user data and set it to state
    const storedUserData = JSON.parse(localStorage.getItem('userdata'));
    if (storedUserData) {
      setUserId(storedUserData.userId);
    }

    // Set saved addresses to state
    setSavedAddresses(savedAddressesData);
  }, []);

  const handleSavedAddressClick = (addr) => {
    setSelectedAddressId(addr.addressId);
    // Handle click logic here
  };



  return (
    <div>
      <div className='address-top'>
        <h2 className='address-heading'>Address</h2>
        <button type='button' className='address-btn'><strong>+</strong>Add new Address</button>
      </div>
      <hr></hr>
      <div className='All-saved-address'>All Saved Address</div>

      <div className='address-div'>
                {savedAddresses.map((addr) => (
                  <div key={addr.addressId}
                      className={`Address-Display ${addr.addressId === selectedAddressId ? 'selected' : ''}`}
                      onClick={() => handleSavedAddressClick(addr)}>
                      {addr.addressId === selectedAddressId ? (
                        <TbCurrentLocation style={{ width: '70px', height: '20px' }} />
                      ) : (
                        <BiCircle style={{ width: '70px', height: '20px' }} />
                      )}
                      <div className='address-box'>
                        <div className='location-icon'><SlLocationPin/></div>
                        <div className='address-paragraph'>
                          <p>{addr.username},{addr.houseNo},{addr.area},<br></br> {addr.city},{addr.mobileNumber},{addr.pincode}</p>  
                        </div>
                        <div className='address-icons'>
                          <div className='edit-icon'><TbEdit/></div>
                          <div className='delete-icon'><RiDeleteBinLine/></div> 
                        </div>  
                      </div>
                         
                  </div>
                 
                    
                ))}
              </div>
    </div>
    
  )
}

export default Address
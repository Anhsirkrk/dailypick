import React,{useState} from 'react';
import {BiCircle} from 'react-icons/bi';
import {TbCurrentLocation} from 'react-icons/tb';

const Address = () => {

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);


  const handleSavedAddressClick = (addr) => {
    // setSelectedAddressId((prevId) => (prevId === id ? null : id));
    setSelectedAddressId((prevId) => (prevId === addr.addressId ? null : addr.addressId));
const settingAddressData = {
  addressId: addr.addressId,
  userId: addr.userId,
  country: addr.country,
  state: addr.state,
  city: addr.city,
  area: addr.area,
  pincode: addr.pincode,
  houseNo: addr.houseNo,
  longitude: addr.longitude,
  latitude: addr.latitude,
  username: addr.username,
  mobileNumber: addr.mobileNumber 
};
localStorage.setItem('SelectedAddressOfSubscription',settingAddressData);

  };




  

  return (
    <div>
      <div className='address-top'>
        <h2 className='address-heading'>Address</h2>
        <button type='button' className='address-btn'><strong>+</strong>Add new Address</button>
      </div>
      <hr></hr>
      <div className='All-saved-address'>All Saved Address</div>

      <div className='savedaddress-scroll-div'>
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.addressId}
                    className={`Saved-AddressDisplay ${addr.addressId === selectedAddressId ? 'selected' : ''}`}
                    onClick={() => handleSavedAddressClick(addr)}
                  >
                    {addr.addressId === selectedAddressId ? (
                      <TbCurrentLocation style={{ width: '70px', height: '20px' }} />
                    ) : (
                      <BiCircle style={{ width: '70px', height: '20px' }} />
                    )}
                    <p className='Address-Paragraph'>{addr.username}, {addr.houseNo} ,{addr.area}, {addr.city} ,{addr.mobileNumber} ,{addr.pincode}
                    </p>        
                              </div>
                ))}
              </div>
    </div>
    
  )
}

export default Address
import React,{useState,useEffect,useRef } from 'react';
import Nav from '../Components/Nav';
import MapComponent  from '../Components/MapComponent';
import { Button } from 'react-bootstrap';
import { Form, Alert } from "react-bootstrap";
import Geocode from 'react-geocode';
import {FiSearch}  from 'react-icons/fi';
import {TbCurrentLocation} from 'react-icons/tb';
import {BiCircle} from 'react-icons/bi';
import '../Css/Location.css';
import validation from '../Components/validations';
import axios from 'axios';
import {ToastContainer,toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { Country, State, City }  from 'country-state-city';




const Location = () => {

    const [address, setAddress] = useState('');
    const [savedAddresses,setSavedAddresses]= useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [locationData, setLocationData] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [userid,setUserId]=useState('');
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [personnameofAddress,setpersonNameOfAddress]= useState('');
    const [mobilenumofAddress,setMobileNumOfAddress]=useState('');
    const [pincode,setPinCode]=useState('');
    const [locality,setLocality]=useState('');
    const [houseNo,setHouseNo]=useState('');;
    // const [selectedCountry, setSelectedCountry] = useState('India');
    const [selectedstate,setSelectedState] = useState('');
    const [selectedStateISCode, setSelectedStateIsCode] = useState('');
    const [selectedStateName, setSelectedStateName] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [addresslbl, setAddresslbl] = useState('');


    



    // const countries = Country.getAllCountries();
    const states = State.getStatesOfCountry('IN') ;
    const cities = selectedStateISCode ? City.getCitiesOfState('IN',selectedStateISCode) : [];

    // console.log(Country.getAllCountries())
    console.log(State.getAllStates())

    const handleCountryChange = (event) => {
    const countryIsoCode = event.target.value;
    // setSelectedCountry(countryIsoCode);
    setSelectedStateIsCode('');
    setSelectedCity('');
  }

  const handleStateChange = (event) => {
    const stateIsoCode = event.target.value;
    const selectedStateObject = states.find(state => state.isoCode === stateIsoCode);
    if (selectedStateObject) {
      setSelectedStateIsCode(selectedStateObject.isoCode);
      setSelectedStateName(selectedStateObject.name); // Add this line to set the state name
    }
    setSelectedState(stateIsoCode);
    setSelectedCity('');
  }
  console.log(selectedStateName);

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
  }


    const amounttobepaid = localStorage.getItem('selectedproductPrice');
    const selectedproductPrice = localStorage.getItem('selectedproductPrice');
    const selectedSizeofproduct = localStorage.getItem('selectedSizeofproduct');
    const quantityofproduct = localStorage.getItem('quantityofproduct');
    console.log(`selpropri`,{selectedproductPrice});
    console.log(`selprosiz`,{selectedSizeofproduct});
    console.log(`selproqun`,{quantityofproduct});
    console.log(`tot amnt`,{amounttobepaid});



    const [validationerrors,setValidationErrors]=useState({});
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      // Get item from local storage on component mount
      const storeddata = localStorage.getItem('userdata');
      if (storeddata) {
      const storeduserdata = JSON.parse(storeddata);
      console.log('storeduseerdata',storeduserdata);
        setUserId(storeduserdata.userId);
      }
    }, []);
    console.log('userid',userid);

    useEffect(()=>{
      if (userid) {
        gettingSavedAddresses(); // Trigger fetching saved addresses when userid is updated
      }
    },[userid]);
    
    const gettingSavedAddresses= async()=>{
      // alert("getting saved addre hitted");
      const url="https://localhost:7041/api/User/GetTheUserAdressDetails";
      const data={
        userId:userid
      }
      console.log(data);
      try{
       // alert("enetered to axios");
        const response = await axios.get(url, { params: data });
        console.log(response.data);
        localStorage.setItem('usersavedaddress',JSON.stringify(response.data));
       // alert("get address axios completed");
        if (response.status === 200) 
        {
          setSavedAddresses(response.data);
        }
        else
        {
          toast.error("getting address failed");
        }
    }
    catch(error)
    {
      alert("gett sav adr axios error catch");
     setResultMessage('An error occurred while processing your request.');
     console.error(error);
   }
  }
  console.log(userid);
  console.log(savedAddresses);

    const addresses = [
      { 
        addressId: 1,
        name: 'John Doe',
        mobile: '+919876543210',
        pincode: '500082',
        houseNo: 'A-123',
        locality: 'Madhapur',
        city: 'Hyderabad',
        state: 'Telangana',
    
      },
      { 
        addressId: 2,
        name: 'Jane Smith',
        mobile: '+919912345678',
        pincode: '400001',
        houseNo: 'B-456',
        locality: 'Colaba',
        city: 'Mumbai',
        state: 'Maharashtra',
    
      },
      { 
        addressId: 3,
        name: 'Alice Johnson',
        mobile: '+919812345678',
        pincode: '600002',
        houseNo: 'C-789',
        locality: 'Egmore',
        city: 'Chennai',
        state: 'Tamil Nadu',
    
      }
    ];

    useEffect(() => {
      if (locationData) {
        setLatitude(locationData.latitude);
        setLongitude(locationData.longitude);
      }
    }, [gettingSavedAddresses,setLocationData,locationData,setSelectedStateName,selectedStateName]);
    console.log(locationData);

   

    

  
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            alert("got cords");
            console.log('Current Coordinates:', latitude, longitude);
            setLatitude(latitude);
            setLongitude(longitude);
            setCoordinates({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
  

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

 

    const handleToggleAddreessForm = () => {
      setShowForm(prevState => !prevState);
      setSelectedAddressId(null);
    }

    const handleAddressLbl = (label) => {
      setAddresslbl(label);
    };

   
    const validatemobile= async(mobilenumofAddress)=>{
      const values ={mobilenumofAddress}
      const validationErrors = validation(values,['mobilenumofAddress']);
      console.log(validationErrors.mobilenumofAddress);
      setValidationErrors((prevState) => ({
        ...prevState,
        mobilenumofAddress: validationErrors.mobilenumofAddress,
      }));
    }

    const validatePinCode= async(pincode)=>{
      const values ={pincode}
      const validationErrors = validation(values,['pincode']);
      console.log(validationErrors.pincode);
      setValidationErrors((prevState) => ({
        ...prevState,
        pincode: validationErrors.pincode,
      }));
    }

    const handlecontinuetopaymentbysavedadress = ()=>{
      if(selectedAddressId!= null){
        const Orderdata ={

        }
        navigate('/home2');
      }
      else{
        return;
      }
       
    }
  const handlenewaddresssubmitform= async (e)=>{
    e.preventDefault();
    alert("add sub form hitted ");
    const values={personnameofAddress,mobilenumofAddress,pincode,locality,houseNo,selectedCity,selectedStateName,addresslbl};
    //alert("check console 243 for values");
    console.log(values);
  
  const validationErrors = validation(values,["personnameofAddress","mobilenumofAddress","pincode","locality","houseNo","selectedCity","selectedStateName","addresslbl"]);
  console.log(validationErrors);
 
  if(Object.keys(validationErrors).length>0)
  {
    console.log(validationErrors);
    alert("validation err recieved");
    console.log(validationErrors);
    setValidationErrors(validationErrors);
    return;
  }
   try 
   {
     alert("entered to axios");
     const url = 'https://localhost:7041/api/User/AddingAdressDetails';
     const data = {
      addressId: 0,
      userId:userid,
      country:"India",
      state:selectedStateName,
      city:selectedCity,
      area:locality,
      pincode:pincode,
      houseNo:houseNo,
      longitude:longitude,
      latitude:latitude,
      username:personnameofAddress,
      mobileNumber:mobilenumofAddress 
     };
     console.log(data);
     alert('axios data ready');
     const response = await axios.post(url, data);
     console.log(response.data);
     alert("axios completed");
     if (response.status === 200) 
     {
      alert("axios 200");
       setSelectedAddressId(response.data.addressId);
       const settingadressdata={
        addressId: response.data.addressId,
        userId:userid,
        country:"India",
        state:selectedStateName,
        city:selectedCity,
        area:locality,
        pincode:pincode,
        houseNo:houseNo,
        longitude:longitude,
        latitude:latitude,
        username:personnameofAddress,
        mobileNumber:mobilenumofAddress 
       }
       console.log(settingadressdata);
       localStorage.setItem('SelectedAddressOfSubscription', JSON.stringify(settingadressdata));     
       const setteddata = JSON.parse(localStorage.getItem('SelectedAddressOfSubscription'));
    console.log(setteddata);
navigate('/home2');
     } 
     else 
     {
      alert("axios not  200");
       setResultMessage("Address Not Added");
     }
   } 
   catch(error)
    {
      alert("axios error catch");
     setResultMessage('An error occurred while processing your request.');
     console.error(error);
   }
  
   }

  // Function to get address from latitude and longitude
  const getAddressFromLatLng = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        // setAddress(address);
        console.log(lat);
        console.log(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

console.log('loca data',locationData);





console.log('sele adr id',selectedAddressId);
  console.log('add lbl',addresslbl);
console.log('currentlat',latitude);
console.log('curr lon',longitude);

  return (
    <>
    <Nav/>
    <div className='Locationpage-container'>
    <ToastContainer/>
    <div className='location-heading '><h2>Location Information</h2></div>
    <div className='locationAndAdressArea'>

      <div className='location-MapDiv'>
       
              <div>
              <div className="location-search-container">
              <input className='location-search-bar-input' placeholder='search for Area,Landmark or Location'/>
              <FiSearch className='search-icon' />
              <Button className='get-location-button' onClick={getCurrentLocation}>Get Current Location</Button>
            </div>
              </div>
              
              <div className='MapComponent'>
                    <MapComponent  setAddress={setLocationData} coordinates={coordinates} />
                  
            </div>
            <div>
            
              <div>
                <div>Latitude: {latitude}</div>
                <div>Longitude: {longitude}</div>
              </div>
            
            </div>
         
      </div>
    
      <div className='Addresses-div'>
     
                <div>
                <h3>Saved Addresses{selectedAddressId}</h3>
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
            <div>
            <div className='AdressForm-div'>
            <Button onClick={handleToggleAddreessForm} className='AddAdressButton'> {showForm ? 'Cancel' : 'Add New Address'}</Button>
            {selectedAddressId  && (
              <Button onClick={handlecontinuetopaymentbysavedadress} className='ContinuePymntBtn'>
                Continue
              </Button>
            )}

              {showForm && !selectedAddressId && (
        
                  <Form className='AddressForm' >
                  
                  <div className='AddressInputandLbl-div'>
        
                          <div className='AddressInput-inputdiv'>

                              <input 
                              type='text'
                              className='Name-input'
                              placeholder="Enter Name"
                              onChange={e=>{setpersonNameOfAddress(e.target.value); }}
                              />
                              <input 
                              type='text'
                              className='Mobile-input'
                              placeholder="Enter Mobile"
                              onChange={e=>{setMobileNumOfAddress('+91'+e.target.value);  validatemobile('+91'+e.target.value);}}
                              />
                      </div> 
                      <div className='AdrressValidationError-div'>
                      {validationerrors.personnameofAddress && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.personnameofAddress}</p>}
                      {validationerrors.mobilenumofAddress && <p  className='AddressFormValError-p' style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.mobilenumofAddress}</p>}
                  </div> 
                  </div>
                
                  <div className='AddressInputandLbl-div'>
                       
                      <div className='AddressInput-inputdiv'>

                          <input 
                          type='text'
                          className='PinCode-input'
                          placeholder="Enter Pin-Code"
                          onChange={e=>{setPinCode(e.target.value); validatePinCode(e.target.value);}}
                          />
                          <input 
                          type='text'
                          className='Locality-input'
                          placeholder="Enter Locality"
                          onChange={e=>setLocality(e.target.value)}
                          />
                      </div> 
                      <div className='AdrressValidationError-div'>
                      {validationerrors.pincode && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.pincode}</p>}
                      {validationerrors.locality && <p  className='AddressFormValError-p'  style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.locality}</p>}
                </div>
                  </div>

                  <div className='AddressInputandLbl-div'>
                      
                      <div className='AddressInput-inputdiv'>
                          <input 
                          type='text'
                          className='Address-input'
                          placeholder="Enter Address(Area & Street)"
                          onChange={e=>setHouseNo(e.target.value)}
                          />

                      </div> 
                      <div className='AdrressValidationError-div'>
                      {validationerrors.houseNo && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.houseNo}</p>}
                </div>  
              </div>
              <div className='AddressInputandLbl-div'>
             <div className='AddressInput-inputdiv'>
                  
                        {/*}   <select value={selectedCountry} onChange={handleCountryChange}>
                              <option value="">Select Country</option>
                              {countries.map(country => (
                                <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                              ))}
                              </select> */}
                  <select value={selectedstate} onChange={handleStateChange} className='statedropdown'>
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                          ))}
                  </select>
                  <select value={selectedCity} onChange={handleCityChange} className='citydropdown'>
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city.name} value={city.name}>{city.name}</option>
                        ))}
                  </select>

                    
                      {/*}  <input 
                        type='text'
                        className='State-input'
                        placeholder="Enter State"
                        onChange={e=>setStatename(e.target.value)}
                        /> */}
                    </div> 
                    <div className='AdrressValidationError-div'>
                    {validationerrors.selectedCity && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.selectedCity}</p>}
                    {validationerrors.selectedState && <p  className='AddressFormValError-p' style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.selectedState}</p>}
                </div>
                          
          </div>
                
                  <div className='Addresslbl-div'>
                      
                      <p> Address label</p>
                    
                        <div className='addresslblbtn-div'>
                      
                        <Button
                        style={{ backgroundColor: addresslbl === 'Home' ? '#66BCFF' : '#FBFAFA' }}
                        className={`addresslblbtn ${addresslbl === 'Home' ? 'selected' : ''}`}
                        onClick={() => handleAddressLbl('Home')}
                      >
                        Home
                      </Button>
                      <Button
                      style={{ backgroundColor: addresslbl === 'Office' ? '#66BCFF' : '#FBFAFA' }}
                        className={`addresslblbtn ${addresslbl === 'Office' ? 'selected' : ''}`}
                        onClick={() => handleAddressLbl('Office')}
                      >
                        Office
                      </Button>
                      <Button
                      style={{ backgroundColor: addresslbl === 'Other' ? '#66BCFF' : '#FBFAFA' }}
                        className={`addresslblbtn ${addresslbl === 'Other' ? 'selected' : ''}`}
                        onClick={() => handleAddressLbl('Other')}
                      >
                        Other
                      </Button>
                        </div>
                        <div className='AdrressValidationError-div'>
                        {validationerrors.addresslbl && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.addresslbl}</p>}
                  </div>
                    </div>


                <div >
                  <Button className='submit-Button' type="submit" variant="primary" onClick={handlenewaddresssubmitform}>
                    Save & Continue
                  </Button>
                </div>
                  </Form>
                  )}
                  </div>

                </div>
          </div>
    
    
    </div>
       
      </div>
      </>
  )
}

export default Location
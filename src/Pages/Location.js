import React,{useState,useEffect} from 'react';
import MapComponent  from '../Components/MapComponent';
import Geocode from 'react-geocode';

const Location = () => {

    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [locationData, setLocationData] = useState(null);

    const amounttobepaid = localStorage.getItem('selectedproductPrice');
    const selectedproductPrice = localStorage.getItem('selectedproductPrice');
    const selectedSizeofproduct = localStorage.getItem('selectedSizeofproduct');
    const quantityofproduct = localStorage.getItem('quantityofproduct');
console.log(`selpropri`,{selectedproductPrice});
console.log(`selprosiz`,{selectedSizeofproduct});
console.log(`selproqun`,{quantityofproduct});
console.log(`tot amnt`,{amounttobepaid});


    
  console.log(`Ldata in loca:`, locationData);

   
  // Function to get address from latitude and longitude
  const getAddressFromLatLng = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
        console.log(lat);
        console.log(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };
console.log(address);
  return (
    <div>
       <MapComponent  setAddress={setLocationData} />
       {locationData && (
        <div>
          <div>Latitude: {locationData.latitude}</div>
          <div>Longitude: {locationData.longitude}</div>
        </div>
      )}
    </div>
  )
}

export default Location
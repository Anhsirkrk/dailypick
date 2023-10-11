import React, { useRef, useEffect } from 'react';

const MapComponent = ({setAddress,coordinates}) => {
  const mapRef = useRef();
  const latituder = coordinates?.latitude;
  const longituder = coordinates?.longitude;
  console.log('rec lat:',latituder);
  console.log('rec lng:',longituder);

  useEffect(() => {
    console.log('Received coordinates:', coordinates);

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latituder || 28.609491, lng: longituder || 77.226200 }, // Initial center coordinates
      zoom: 15, // Initial zoom level
    });

   
    
    
    // Add event listener to get latitude and longitude on click
    const marker = new window.google.maps.Marker({
        position:{ lat: latituder || 28.609491, lng: longituder || 77.226200 },
        map: map,
        draggable: true, // Make the marker draggable
      });

  
      map.addListener('click', (event) => {
        const { latLng } = event;
        console.log('Latitude:', latLng.lat(), 'Longitude:', latLng.lng());
        marker.setPosition(latLng); // Set the marker position on click

      const locationdata = 
      {
        latitude: latLng.lat(),
        longitude: latLng.lng(),
      };
      console.log(`ladta in ma`,locationdata);

      setAddress(locationdata);

      });
      
    }, [coordinates, setAddress, latituder, longituder]);
    console.log('mapRef:', mapRef);
    console.log(setAddress);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;

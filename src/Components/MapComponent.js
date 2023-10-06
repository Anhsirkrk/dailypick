import React, { useRef, useEffect } from 'react';

const MapComponent = ({setAddress}) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 }, // Initial center coordinates
      zoom: 8, // Initial zoom level
    });
    
    // Add event listener to get latitude and longitude on click
    const marker = new window.google.maps.Marker({
        position: { lat: 0, lng: 0 },
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
      localStorage.setItem('latlongdata', JSON.stringify(locationdata));
       // Update the address in Location component
      setAddress(locationdata);
      const storeddata = localStorage.getItem('latlongdata');
    console.log(storeddata);
      });
      
    }, [setAddress]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;

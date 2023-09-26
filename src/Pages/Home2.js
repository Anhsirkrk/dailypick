
import { useState,useEffect } from 'react';

import React from 'react';
import '../Css/Home2.css';
import banner from '../Images/Home/Rectangle 1403.png';
import HorizontalScroll from "react-horizontal-scrolling";

import Nav from '../Components/Nav';


import { useLoginAuth } from '../Components/UserAuthContext';
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import {FaRegUser} from 'react-icons/fa'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {GoLocation} from 'react-icons/go';




const Home2 = () => {


  const [dailyneeds, setDailyneeds]=useState([]);

  const [categoryId, setCategoryid]=useState('');
  const [categoryName, setCategoryname]=useState('');
  const [description, setDescription]=useState('');
  const [imageUrl,setImageurl]=useState('');


  const GetDailyNeed=()=>{
    axios.get('https://localhost:7041/api/Admin/GetAllCategoriesWithImageUrls')
    .then((result)=>{
      console.log('API Response:', result.data); 
      setDailyneeds(result.data);
 
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    GetDailyNeed();
  },[]);

  const {isLoginauthenticated, setIsLoginauthenticated}= useLoginAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // Use OpenCage API to get city
          axios
            .get(`https://api.opencagedata.com/geocode/v1/json`, {
              params: {
                key: '6fa32c40ce6d44e7b02b86a5111f3277', // Get your API key from OpenCage
                q: `${latitude},${longitude}`,
              },
            })
            .then((response) => {
              const city = response.data.results[0].components.city;
              setCity(city);
            })
            .catch((error) => {
              console.error('Error fetching city:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  
  useEffect(() => {
    // Get item from local storage on component mount
    const storeddata = localStorage.getItem('userdata');
    const storeduserdata = JSON.parse(storeddata);
    console.log(storeduserdata);
    if (storeduserdata) {
      setUsername(storeduserdata.firstName);
    }
    console.log(username);
  }, []);


  const handlesignout = () => {
    localStorage.removeItem('userdata');
    setIsLoginauthenticated(false);
    <Navigate to='/Login2'/>
  }

  if (!isLoginauthenticated) {
    return <Navigate to='/Login2' />;
  }


  return (
    <>

        <Nav/> 
        
        <div className='banner'>
            <img class="bannner-img" src={banner} alt='banner' />
        </div>
        <img src="E:/Visual Studio/Ecommerce_Api/Assests/Images/Category_images/milk.png" alt='dummyimage'/>
        <div className='Button-Fields'>
            <center>
            <div className="fields">
  	            <div className="field" >
                    <button className="btn">News-Paper</button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Milk </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Curd </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Eggs </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Vegetables </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Breads </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn"  >Cookies </button>
  	            </div>
            </div>
            </center>
        </div>
        <div className='daily-needs'>     
            
  	            <div className="Heading" >Daily Needs </div>
  	            <div className="group" >
                <div className="scroll-container">
                    {dailyneeds.map((items)=>{
                        return(
                            <>
                            <div className="rectangle" >
                                <div className='DN-field' key={items.categoryId}>
                                    <div className='img-box'>
                                    <img src={items.imageUrl} alt={items.categoryName} />   
                                    </div>
                                </div>
                                <div className='detail'>
                                        <h3>{items.categoryName}</h3>  
                                    </div>
                                </div>   
                            </>
                        )})}
                </div>
  	            </div>
            </div>
            <div className='Best-Sellers'>     
            
            <div className="Heading" >Best Sellers </div>
            <div className="group" >
            <div className="scroll-container">
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Milk </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Curd </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Cookies </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Eggs </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Milk </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Curd </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Cookies </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Eggs </div>
                    </div>
              </div>
              </div>
            </div>
      </div>
      <div className='Brands'>     
            
            <div className="Heading" >Brands </div>
            <div className="group" >
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />  
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" /> 
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />  
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                    </div>
              </div>
            </div>
      </div>
       
    </>
  )
}

export default Home2
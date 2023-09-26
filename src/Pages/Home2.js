
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
import { signOut } from 'firebase/auth';

const Home2 = () => {
  const [dailyneeds, setDailyneeds]=useState('');
  const {isLoginauthenticated, setIsLoginauthenticated}= useLoginAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  // alert('home2 isLoginauthenticated', isLoginauthenticated);
  console.log(isLoginauthenticated);

  useEffect(() => {
    const token = localStorage.getItem('userdata');
    if (token) {
      setIsLoginauthenticated(true);
    }
  }, []);
  
  useEffect(() => {
    // Get item from local storage on component mount
    const storeddata = localStorage.getItem('userdata');
    if (storeddata) {
    const storeduserdata = JSON.parse(storeddata);
    console.log(storeduserdata);
      setUsername(storeduserdata.firstName);
    }
    console.log(username);
  }, []);

  const GetDailyNeed=()=>{
    axios.get('https://localhost:7041/api/Admin/GetAllProducts')
    .then((result)=>{
      setDailyneeds(result.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <>
    
        <Nav/>
        <div className='banner'>
            <img class="bannner-img" src={banner} alt='banner' />
        </div>
        <div className='Button-Fields'>
            <center>
            <div className="fields">
  	            <div className="field" >
                    <button className="btn">News-Paper</button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn"  >Milk </button>
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
                <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Vegetables </div>
      			        </div>
    		        </div>
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
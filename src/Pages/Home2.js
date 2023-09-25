import { useState,useEffect } from 'react';
import React from 'react';
import '../Css/Home2.css';
import banner from '../Images/Home/Rectangle 1403.png';
import HorizontalScroll from "react-horizontal-scrolling";
import { useLoginAuth } from '../Components/UserAuthContext';
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import {FaRegUser} from 'react-icons/fa'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {GoLocation} from 'react-icons/go';



const Home2 = () => {

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



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
        <div className='top-bar'>
            <div className='logo'>Logo</div>
            <div className="Location">
            <GoLocation style={{color:'whitesmoke'}}/>
  {/*}   <svg className="material-symbols-location-on-outline"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3334 12.6194C12.879 12.6194 13.3463 12.4249 13.7351 12.036C14.1234 11.6478 14.3175 11.1809 14.3175 10.6352C14.3175 10.0896 14.1234 9.62234 13.7351 9.23345C13.3463 8.84522 12.879 8.65111 12.3334 8.65111C11.7877 8.65111 11.3208 8.84522 10.9326 9.23345C10.5437 9.62234 10.3492 10.0896 10.3492 10.6352C10.3492 11.1809 10.5437 11.6478 10.9326 12.036C11.3208 12.4249 11.7877 12.6194 12.3334 12.6194ZM12.3334 19.911C14.3506 18.0592 15.8469 16.3766 16.8224 14.8634C17.798 13.3508 18.2857 12.0076 18.2857 10.8337C18.2857 9.0314 17.711 7.55554 16.5615 6.40607C15.4127 5.25726 14.0033 4.68286 12.3334 4.68286C10.6634 4.68286 9.25366 5.25726 8.10419 6.40607C6.95538 7.55554 6.38098 9.0314 6.38098 10.8337C6.38098 12.0076 6.86874 13.3508 7.84427 14.8634C8.8198 16.3766 10.3162 18.0592 12.3334 19.911ZM12.3334 22.54C9.67132 20.2748 7.68323 18.1706 6.36907 16.2275C5.05426 14.285 4.39685 12.4871 4.39685 10.8337C4.39685 8.35349 5.1948 6.37763 6.7907 4.90607C8.38594 3.43451 10.2335 2.69873 12.3334 2.69873C14.4332 2.69873 16.2808 3.43451 17.876 4.90607C19.4719 6.37763 20.2699 8.35349 20.2699 10.8337C20.2699 12.4871 19.6128 14.285 18.2986 16.2275C16.9838 18.1706 14.9954 20.2748 12.3334 22.54Z"
                        fill="white"/>
  </svg> */}
                <div className="hyderabad"><p>{city}</p></div>
            </div>
            <div className="userdisplay" onClick={toggleDropdown}>
            <div className="_1Us3XD">
                <div className="H6-NpN">
                  <a className="_1TOQfO" title={username} aria-haspopup="true" href='#'>
                  <FaRegUser/>
             {/*     <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg" alt="bhaskar" class="-dOa_b L_FVxe" width="24" height="24" /> */}
                  <span class="_1sLnDu">{username}</span>
                  </a>
                </div>
            </div>
          {/*}  {userdata.firstName} */}
                {isOpen && (
                    <div className="dropdown-content">
                      <a href="#">Profile</a>
                      <a href="#" onClick={handlesignout}>Signout</a>
                    </div>
                )}
          </div>
        </div>
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
                <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Vegetables </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Milk </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >News Papers </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Curd </div>
      			        </div>
    		        </div>
                <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Vegetables </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Milk </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >News Papers </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Curd </div>
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
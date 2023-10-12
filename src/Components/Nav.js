import React,{useState,useEffect } from 'react';
import '../Css/Nav.css';
import {FaRegUser} from 'react-icons/fa'
import { Navigate, json } from 'react-router-dom';
import { useLoginAuth } from '../Components/UserAuthContext';
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import {GoLocation} from 'react-icons/go';
import {BsCart2} from 'react-icons/bs';
import { Button } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
const Nav = () => {

  const {isLoginauthenticated, setIsLoginauthenticated}= useLoginAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
  console.log(location);

  useEffect(() => {
    // Get item from local storage on component mount
    const recieveddata = localStorage.getItem('userdata');
    const storeddata=(JSON.parse(recieveddata));
    console.log(storeddata);
    if (storeddata) {
      setUsername(storeddata.firstName);
    }
    console.log(username);
  }, []);

  const handlesignout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('userdata');
    localStorage.removeItem('isLoggedIn');
    setUsername('');
    console.log('nav.js before setting to false', isLoginauthenticated);
    if(isLoginauthenticated===true)
    {
      setIsLoginauthenticated(false);
      console.log('nav.js before setting to false',isLoginauthenticated);
       //return <Redirect to="/popup" />;
      //navigate('/popup');
     window.location.href='/popup';
     window.history.replaceState(null,'','/popup');
     console.log(isLoginauthenticated);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('isLoggedIn') === 'true')
    {
      console.log('nav.js', JSON.parse(localStorage.getItem('isLoggedIn')));
      setIsLoginauthenticated(true);
      console.log('navjs' , isLoginauthenticated);
    }
  }, [isLoginauthenticated,setIsLoginauthenticated]);
     
  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", isLoginauthenticated);
  }, [username,isLoginauthenticated,setIsLoginauthenticated]);

console.log(isLoginauthenticated);
console.log(username);

  return (
    <>

        
        <div className='row' id='navbar-row'>
            <div className='col-2' id='navbar-row-col-2'>
              <div className='logo'>Logo</div>
              <div className="Location">
                    <div className='LocationBox'>
                      <GoLocation style={{color:'whitesmoke'}}/>
                          <div className="cityname"><p>{city}</p></div>
                    </div>
              </div>

            </div>
          
            <div className='col-4' id='navbar-row-col-4'>
                <div class='navsearchinput-container'>
                    <input type='text' class='navsearchinput' placeholder='search for products'></input>
                    <div class='navsearchicon'><GoLocation style={{color:'whitesmoke'}}/></div>
               </div>
           </div>

            <div className='col-4' id='navbar-userdisplay-col-2' onClick={toggleDropdown}>
            <Button className='MySubscriptionsBtn'>My Subscriptions</Button>
              </div>

            <div className='col-2' id='navbar-userdisplay-col-2' onClick={toggleDropdown}>
            <BsCart2 className='Cart-icon'></BsCart2>
                      <div className="_1Us3XD">
                          <div className="H6-NpN">
                            <a className="_1TOQfO" title={username} aria-haspopup="true" >
                            <FaRegUser className='nav-usericon'/>
                      {/*     <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg" alt="bhaskar" class="-dOa_b L_FVxe" width="24" height="24" /> */}
                            <span class="_1sLnDu">{username}</span>
                            </a>
                          </div>
                      </div>
                        {/*}  {userdata.firstName} */}
                              {isOpen && (
                                  <div className="userdisplay-dropdown-content">
                                    <a href='#'  >Profile</a>
                                    <a href="#" onClick={(e) => handlesignout(e)}>Signout</a>
                                  </div>
                              )}
                
            </div>
        </div>
        
    </>
  )
}
export default Nav;

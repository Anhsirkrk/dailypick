import React,{useState,useEffect } from 'react';
import '../Css/Nav.css';
import profilepic from '../Images/vecteezy_business-man-icon-for-your-web-profile_7522850.jpg'
import {FaRegUser} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import { Navigate, json } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import {GoLocation} from 'react-icons/go';
import {BsCart2} from 'react-icons/bs';
import { Button } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from "firebase/auth";





const Nav = () => {



  const { isUserLoggedIn,setIsUserLoggedIn } = useUserAuth(); // Updated
  const { logOut} = useUserAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [noofproductsinwhislist,setNoofproductsinwhislist]=useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("nav.js is login authenticated:", isUserLoggedIn);
  }, [isUserLoggedIn]);


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
    console.log("nav : storeddata",recieveddata);
    const storeddata=(JSON.parse(recieveddata));
    console.log("nav : storeddata",storeddata);

    setNoofproductsinwhislist(localStorage.getItem('noofproductsinwhislist'));
    

    if (storeddata) {
      console.log(storeddata);
     // alert("stored data atrue");
      if(storeddata.firstName){
        alert("username if ihitted");
        setUsername(storeddata.firstName);
        
      }
      else if(storeddata.firstname){
        alert("firstname if ihitted");
        setUsername(storeddata.firstname);
        
      }
      else if(storeddata.mobile){
        alert("mobile if ihitted");
        setUsername(storeddata.mobile);
        
      }
      else if(storeddata.email){
        alert("email if ihitted");
        setUsername(storeddata.email);
        
      }



    }
    console.log(username);
  }, []);

 

  

  const handlesignout = async (e) => {
    e.preventDefault();

    try {
      await logOut();
      localStorage.removeItem('userdata');
      localStorage.removeItem('isLoggedIn');
      setUsername('');
      console.log('nav.js before setting to false', isUserLoggedIn);

      if (isUserLoggedIn === true) {
        setIsUserLoggedIn(false);
        console.log('nav.js before setting to false', isUserLoggedIn);
        window.location.href = '/popup';
        window.history.replaceState(null, '', '/popup');
      }
    } catch (error) {
      console.error('Error during sign-out:', error);
      // Handle the error as needed
    }
  }

  useEffect(() => {
    if(localStorage.getItem('isLoggedIn') === 'true')
    {
      console.log('nav.js', JSON.parse(localStorage.getItem('isLoggedIn')));
      setIsUserLoggedIn(true);
      console.log('navjs' , isUserLoggedIn);
    }
  }, [isUserLoggedIn,setIsUserLoggedIn]);

  useEffect(() => {
    // Perform any actions you want when loginwithotpshow changes here
    console.log("loginwithotpshow has changed:", isUserLoggedIn);
  }, [username,isUserLoggedIn,setIsUserLoggedIn]);

console.log(" nav.js isUserLoggedIn",isUserLoggedIn);
console.log(username);

const handleprofilepicselect=()=>{
if(isUserLoggedIn){
  navigate('/profile');
}
}
 
const handlebacktohome =()=>{
  navigate('/home2');
}

const handleMysubscriptionsroute =()=>{
  if(isUserLoggedIn)
  {
    navigate('/mysusbcription');
  }
}

const handleMyCartroute =()=>{
  if(isUserLoggedIn)
  {
    navigate('/mycart');
  }
}

const handleMyWishListroute =()=>{
  if(isUserLoggedIn)
  {
    navigate('/mywishlist');
  }
}


  return (
    <>

        
        <div className='row' id='navbar-row'>
            <div className='col-2' id='navbar-row-col-2'>
              <div className='logo' onClick={handlebacktohome}>Logo</div>
              <div className="Location">
                    <div className='LocationBox'>
                      <GoLocation style={{color:'whitesmoke'}}/>
                          <div className="cityname"><p>{city}</p></div>
                    </div>
              </div>

            </div>
          
            <div className='col-4' id='navbar-row-col-4'>
                <div className='navsearchinput-container'>
                    <input type='text' class='navsearchinput' placeholder='search for products'></input>
                    <div className='navsearchicon'><GoLocation style={{color:'whitesmoke'}}/></div>
               </div>
           </div>

            <div className='col-2' id='navbar-userdisplay-col-2'>
            <Button className='MySubscriptionsBtn' onClick={handleMysubscriptionsroute} >My Subscriptions</Button>
            <BsCart2 className='Cart-icon' onClick={handleMyCartroute}></BsCart2>
            <AiOutlineHeart className='wishlist-icon' onClick={handleMyWishListroute}></AiOutlineHeart>
            <p>{noofproductsinwhislist}</p>
            <div className="_1Us3XD" onClick={toggleDropdown}>
                        <img className='profile-image' src={profilepic}  alt='profile-image' />
                           {/*<div className="H6-NpN">
                            <a className="_1TOQfO" title={username} aria-haspopup="true" >
                             <FaRegUser className='nav-usericon'/> 
                          <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg" alt="bhaskar" class="-dOa_b L_FVxe" width="24" height="24" />
                            <span class="_1sLnDu">{username}</span>
                            </a> 
                          </div>*/}
                      </div>
                      {isOpen && (
                                  <div className="userdisplay-dropdown-content">
                                    <h5 className='Profile-Name-heading' >Profile Name</h5>
                                    <a className="_1TOQfO" title={username} aria-haspopup="true" >{username}</a>
                                   <a href='#' onClick={handleprofilepicselect}  >Profile</a>
                            
                                    <a href="#" onClick={(e) => handlesignout(e)}>Signout</a>
                                  </div>
                              )}
              </div>

            {/* <div className='col-4' id='navbar-userdisplay-col-2' onClick={toggleDropdown}>
                     
                        {/*}  {userdata.firstName} 
                              
                
            </div> */}
        </div>
        
    </>
  )
}
export default Nav;

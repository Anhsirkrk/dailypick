
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
import Banana from '../Images/Dummy/Banana.jpg';
import Pomegranate from '../Images/Dummy/Promogranate.png';
import HatsunGhee from '../Images/Dummy/Hatsun_Ghee.jpg';
import HeritageCowGhee  from  '../Images/Dummy/heritage_cow_ghee.jpg';
import HeritageCurd1 from '../Images/Dummy/Heritage_Curd_1 copy.jpg';

const Home2 = () => {

  const [dailyneeds, setDailyneeds]=useState([]);
  const [brands, setBrands]=useState([]);

  const [categoryId, setCategoryid]=useState('');
  const [categoryName, setCategoryname]=useState('');
  const [description, setDescription]=useState('');
  const [imageUrl,setImageurl]=useState('');

  const GetDailyNeed=()=>{
    const  url="https://localhost:7041/api/Admin/GetDetailsAndImagesOfCategories";
    axios.post(url)
    .then((result)=>{
      console.log('API Response:', result.data); 
      setDailyneeds(result.data);
 
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const GetBrands=()=>{
    const  url="https://localhost:7041/api/Admin/GetDetailsAndImagesOfBrands";
    axios.post(url)
    .then((result)=>{
      console.log('API Response:', result.data); 
      setBrands(result.data);
 
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
   GetDailyNeed();
   GetBrands();
  },[]);
  
  console.log(dailyneeds);
  console.log(brands);


  const {isLoginauthenticated, setIsLoginauthenticated}= useLoginAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  // alert('home2 isLoginauthenticated', isLoginauthenticated);
  console.log(isLoginauthenticated);

  useEffect(() => {
    // const token = localStorage.getItem('userdata');
    // if (token) {
    //   setIsLoginauthenticated(true);
    // }
    const token = localStorage.getItem('userdata');
    if(localStorage.getItem('isLoggedIn') === true)
    {
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

 const HandleMilkProducts=()=>{
  alert("milk btn hitted");
  navigate('/products');
 }

  return (
    <>
        <Nav/> 
        <div className='pagecontent'>
        <div className='banner'>
            <img class="bannner-img" src={banner} alt='banner' />
        </div>
 {/*} <img src="" alt='dummyimage'/> */}

        <div className='Button-Fields'>
            
            <div className="fields">
  	            <div className="field" >
                    <button className="btn" >News-Paper</button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" onClick={HandleMilkProducts}  >Milk </button>
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
           
        </div>
        <div className='daily-needs'>     
  	            <div className="Heading" >Daily Needs </div>
  	            <div className="group" >
                <div className="scroll-container">
     
                    {dailyneeds.map((dailyneed)=>{
                        return(
                            <>
                            <div className="rectangle" >
                                <div className='DN-field' key={dailyneed.categoryId}>
                                    <div className='img-box'>
                                    <img src={`data:image/jpeg;base64,${dailyneed.base64Image}`} alt={`User ${dailyneed.userId}`}  className='Dailyneed-Images'/>   
                                    </div>
                                </div>
                                <div className='detail'>
                                        <h3>{dailyneed.categoryName}</h3>  
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
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={HeritageCowGhee} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                        <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={Pomegranate} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                     <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={HatsunGhee} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                    <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={Banana} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                    <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={HeritageCurd1} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                    <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={HeritageCowGhee} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                  <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={HeritageCowGhee} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

                    <div className="rectangle" >
                            <div className='DN-field' >
                                <div className='img-box'>
                                <img src={HeritageCowGhee} alt='Cow Ghee'  className='Dailyneed-Images'/>   
                                </div>
                            </div>
                            <div className='detail'>
                                    <h3>Cow Ghee</h3>  
                                </div>
                        </div> 

              </div>
            </div>
      </div>
      <div className='Brands'>     
      <div className="Heading" >Brands </div>
      <div className="group" >
      <div className="scroll-container">

          {brands.map((brand)=>{
              return(
                  <>
                  <div className="rectangle" >
                      <div className='DN-field' key={brand.brandId}>
                          <div className='img-box'>
                          <img src={`data:image/jpeg;base64,${brand.base64Image}`} alt={`User ${brand.brandId}`}  className='Dailyneed-Images'/>   
                          </div>
                      </div>
                     
                      </div>   
                  </>
              )})}

      </div>
      </div>
  </div>
  </div>
       
    </>
  )
}
export default Home2
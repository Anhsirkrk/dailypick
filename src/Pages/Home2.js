
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



import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Home2 = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };





  const [dailyneeds, setDailyneeds]=useState([]);
  const [brands, setBrands]=useState([]);

  const [categoryId, setCategoryid]=useState('');
  const [categoryName, setCategoryname]=useState('');
  const [description, setDescription]=useState('');
  const [imageUrl,setImageurl]=useState('');
  const [addressdata,setAddressData]= useState({});
  const [wishlistadata,setWishListData]= useState([]);

  const {isLoginauthenticated, setIsLoginauthenticated}= useLoginAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userid,setUserId]=useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user data is stored in local storage
    const storeddata = localStorage.getItem('userdata');
    if (storeddata) {
      // If user data is available, update state with username and userid
      const storeduserdata = JSON.parse(storeddata);
      setUsername(storeduserdata.firstName);
      setUserId(storeduserdata.userId);
      
    }
  }, []);


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


  useEffect(() => {
    // Call GetDailyNeed, GetBrands, and GetWishList when userid changes
    GetDailyNeed();
    GetBrands();
  }, [userid]);


  console.log('home2 page userid ',userid);
  console.log(dailyneeds);
  console.log(brands);
  console.log('wishlistdata  hompeage',wishlistadata);

  // alert('home2 isLoginauthenticated', isLoginauthenticated);
  console.log(isLoginauthenticated);
console.log(addressdata);

  const HandleProductsByCategory = (category) => {
    navigate('/products', { state: { category } });
  }

  const HandleProductsByBrand = (brand) => {
    console.log(brand);
    navigate('/products', { state: { brand } });
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
                    <button className="btn" onClick={()=>HandleProductsByCategory("")} >All Products</button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" onClick={() => HandleProductsByCategory('Milk')}  >Milk </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" onClick={() => HandleProductsByCategory('NewsPapers')}>News Papers </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" onClick={() => HandleProductsByCategory('Vegetables')} >Vegetables </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn"  onClick={() => HandleProductsByCategory('Curd')}>Curd </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" onClick={() => HandleProductsByCategory('Fruits')} >Fruits </button>
  	            </div>
  	          
            </div>
           
        </div>
        <div className='daily-needs'>     
  	            <div className="Heading" >Daily Needs </div>
  	            <div className="group" >
                <div className="scroll-container">
                
                    {dailyneeds.map((dailyneed)=>{
                      console.log(dailyneed);
                        return(
                            <>
                            <div className="rectangle" onClick={() => HandleProductsByCategory(`${dailyneed.categoryName}`)} >
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
            console.log(brand);
              return(
                  <>
                  <div className="rectangle" onClick={() => HandleProductsByBrand(`${brand.brandName}`)}>
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
import React, { useState,useEffect} from "react";
import Nav from "../Components/Nav";
import '../Css/mywishlist.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from './ProductDetail';
import '../Css/Products.css';
import '../Css/mysubscription.css';
import '../Css/mywishlist.css'
import axios, { all } from 'axios';
import SubscriptionModal  from './SubscriptionModal';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {ToastContainer,toast } from 'react-toastify';
import {AiOutlineDown} from 'react-icons/ai';


const MySubscriptions =()=>{

    const [product,setProduct]= useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({}); 
    const [selectedPrices, setSelectedPrices] = useState({}); 
     const [selectedproductPrice, setSelectedproductPrice] = useState([]);
     const [showModal, setShowModal] = useState(false);
     const [selectedProduct, setSelectedProduct] = useState(null);
     const [selectedCategories, setSelectedCategories] = useState([]);
     const [ selectedBrands,setSelectedBrands] = useState([]);
     const [selectedRatings,setSelectedRatings] = useState([]);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const [subscriptionlistData,setSubscriptionListData]= useState([]);
     const [wishlistData,setWishListData]= useState([]);
     const [userid,setUserId]=useState('');


     const [showSubscriptionDataIndex, setShowSubscriptionDataIndex] = useState(null);


     const location = useLocation();
     const navigate = useNavigate();
    
  
  
    
    useEffect(()=>{
          // Get item from local storage on component mount
    const storeddata = localStorage.getItem('userdata');
    if (storeddata) {
    const storeduserdata = JSON.parse(storeddata);
    console.log('storeduseerdata',storeduserdata);
      setUserId(storeduserdata.userId);
    }
      // Call GetWishList only if userid is available
  if (userid) {
    
    GetSubscriptionsList();
  }
       },[userid]);
    
 

  
      const handleaddnewproduct = ()=>{
        navigate('/products');
      }

        
      const GetSubscriptionsList = async () => {
        alert(userid);
        if (userid) {
        
          const url = `https://localhost:7041/api/User/GetUserSubscribedProducts?userid=${userid}`;

          const data = {
            userId:userid,
          }
          try {
             alert("hitte get subsc tyry");
            const response = await axios.get(url);
            console.log('API Response:', response.data); 
            // const parsedData = JSON.parse(response.data);
               // Update the wishlist data state
               setSubscriptionListData(response.data);
               setFilteredProduct(response.data);
               
            localStorage.removeItem('subscriptionlistdata');
            localStorage.setItem('subscriptionlistdata', JSON.stringify(response.data));
          } catch (error) {
            alert("hitte getsubscList catch");
            console.error('Getsubscriptionlist axios error', error);
          }
        }
      };
      console.log('setsubscriptionlistdata',subscriptionlistData);

    // const handlesusbcriptiondata=(index)=>{
    //   setShowSubscriptionDataIndex(!showSubscriptiondata);
    // }
    const handlesusbcriptiondata = (index) => {
      setShowSubscriptionDataIndex(prevIndex => prevIndex === index ? null : index);
  }

    return (
                <>
                <Nav/>
                <div className="wishlistpage-container">
                    <h3 className="wishlist-page-heading" style={{fontSize:'30px', fontWeight:'bolder'}}>My Subscriptions <span style={{ fontSize: '15px', fontWeight:'normal' }} >({filteredProduct.length} results)</span></h3>
                    <div className='productbox'>
                    <ToastContainer/>
                        <div className='wishlistproductbox-container'>
                        {
                            subscriptionlistData.map((curElm,index) => 
                              {

                                  return(
                                      <>
                                      <div className="mysubscription-product-card-container">
                                      <Card className='mysubscription-product-card'>
                                    
                                      <div className={`overlay ${!curElm.isSubscriptionActive ? 'visible' : ''}`}></div>                                      <Card.Img variant="top" src={`data:image/jpeg;base64,${curElm.image}`} alt={curElm.Title} />
                                      <Card.Body className='mysubscription-product-card-body'>
                                        <Card.Title className='mysubscription-product-card-title'>{curElm.productName}</Card.Title>
                                        <Card.Text className='mysubscription-product-card-text'>
                                                <div className='mysubscription-Price-QtyDiv'>
                                                {/*}      <h4>${product.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(selectedSize)]}</h4> */}
                                                <h4>$ {curElm.productindividualprice}</h4>
                                                
                                                </div>
                                        </Card.Text>
                                     
                                      </Card.Body>
                                    </Card>
                                    <div className="mysubscription-product-card-buttonsdiv">
                                    <Button className={`subscriptionshowBtn ${curElm.isSubscriptionActive ? '' : 'subscriptioninactive'}`}> {curElm.isSubscriptionActive 
                                      ? (curElm.subscriptionType === 'SingleDay' ? 'daily subscription' : curElm.subscriptionType === 'Weekly' ? 'subscription for 1 week' : 'subscription for 1 month'):'Inactive'}
                                    </Button>
                                    <Button className={`subcriptionDetailShowingArrowBtn ${curElm.isSubscriptionActive ? '' : 'subscriptioninactive'}`} onClick={()=>handlesusbcriptiondata(index)}><AiOutlineDown className="subcriptionDetailShowingArrowBtn-icon"/></Button>


                                    </div>
                                    {showSubscriptionDataIndex === index && (
                                    <div className="subscriptiondetaildiv">
                                    <p>start date : {curElm.startDate}</p>
                                    <p>end date : {curElm.endDate}</p>
                                    <p>Total Amount : {curElm.totalAmount}</p>
                                    <p>Payment Ref no :{curElm.paymentrefno}</p>
                                    </div>
                                    )
                                    }
                                    </div>

                                      </>
                                  )
                              })
                              
                              
                          }
                          <Card className='product-card'>
                          <Card.Body className='product-card-body'>
                            <Card.Title className='product-card-title'></Card.Title>
                            <Card.Text className='product-card-text'>
                            <div className="Addwishlisticondiv" onClick={handleaddnewproduct}>
                                   <h2 className="AddWIshlist-icon">+</h2>
                                   <h3 className="addwishlisttext">Add new Product</h3>
                                   </div>
                            </Card.Text>
                            
                          </Card.Body>
                        </Card>
                           
                        </div>
                        
                    </div >
                    <div className="wishlistgotohomebtn-div">
                     <Button className="wishlistgotohomebtn">Go to Home</Button>
                     </div>
                </div>
                </>
    )
}

export default MySubscriptions;
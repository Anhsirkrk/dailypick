import React, { useState,useEffect} from "react";
import Nav from "../Components/Nav";
import '../Css/mywishlist.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from './ProductDetail';
import '../Css/Products.css';
import axios, { all } from 'axios';
import SubscriptionModal  from './SubscriptionModal';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {ToastContainer,toast } from 'react-toastify';


const MyWishlist =()=>{

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

     const [wishlistData,setWishListData]= useState([]);
     const [userid,setUserId]=useState('');


     const location = useLocation();
     const navigate = useNavigate();
    
    //  useEffect(()=>{ 
    //   const selectedSize = filteredProduct.priceOfEachUnits;
    //   const selectedPrice = filteredProduct.sizeOfEachUnits.includes(Number(selectedSize))
    //     ? filteredProduct.priceOfEachUnits[filteredProduct.sizeOfEachUnits.indexOf(Number(selectedSize))]
    //     : '';
    //     setSelectedproductPrice(selectedPrice);
    //     // setSelectedSizeofproduct(selectedSize);

  
    // },[]);
    // console.log(selectedproductPrice);
    // console.log(selectedSizeofproduct);
    // console.log(subscriptionTypesData);
  
    
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
    GetWishList();
  }
        // const retrievewishlistdata = JSON.parse(localStorage.getItem('wishlistdata'));
        // setFilteredProduct(retrievewishlistdata);
        // setWishListData(retrievewishlistdata);
       },[userid]);
    
    const handleSubscribeClick = () => {
   
      };

      const handleDropdownChange = (productId, newSize) => {
        const selectedProduct = filteredProduct.find(p => p.sizeOfEachUnits.includes(Number(newSize)));
        const selectedPrice = selectedProduct ? selectedProduct.priceOfEachUnits[selectedProduct.sizeOfEachUnits.indexOf(Number(newSize))] : '';
      
        setSelectedSizes(prevSelectedSizes => ({
          ...prevSelectedSizes,
          [productId]: newSize
        }));
      }
      const handleaddnewproduct = ()=>{
        navigate('/products');
      }

      const GetWishList = async () => {
        // alert(userid);
        if (userid) {
          const url = `https://localhost:7041/api/Wishlist/GetUserWishlistProducts?userid=${userid}`;
          try {
            // alert("hitte getwishkist tyry");
            const response = await axios.get(url);
            console.log('API Response:', response.data); 
            // const parsedData = JSON.parse(response.data);
               // Update the wishlist data state
               setWishListData(response.data);
               setFilteredProduct(response.data);
               const initialSelectedSizes = {};
               const initialSelectedPrices ={};
            
               response.data.forEach(item => {
                initialSelectedSizes[item.productId] = item.sizeOfEachUnits[0];
                initialSelectedPrices[item.productId] = item.priceOfEachUnits[0]; // Assuming the first price is the default
              });

              setSelectedSizes(initialSelectedSizes);
              setSelectedPrices(initialSelectedPrices);
            localStorage.removeItem('wishlistdata');
            localStorage.setItem('wishlistdata', JSON.stringify(response.data));
          } catch (error) {
            alert("hitte getwishkist catch");
            console.error('GetWishList axios error', error);
          }
        }
      };
      console.log('setwishlistdata',wishlistData);
      const handleaddorremovewishlist= async (Pid)=>{
        // Id.preventDefault();
        alert(Pid);
        alert("handleaddtowishlist hitted");
        const isInWishlist = isProductInWishlist2(Pid);
        alert(isInWishlist);
        console.log(isInWishlist);
        if (isInWishlist.isInWishlist===true)
         {
            const data={
              wishlistId:0,
              userId:userid,
              productId:Pid,
              isInWishlist:false
            }
            const url="https://localhost:7041/api/Wishlist/CreateWishlist";
            try{
              const response = await axios.post(url,data );
              alert("axios done");
              console.log(response);
              if(response.status === 200)
              {
              alert("axios rem wishlist done");
              await GetWishList();
                toast.error("item removed from wishlist");
              
              }
            }
            catch(error)
            {
              alert("catch hitted");
              console.error('handleaddtowishlist axios error',error);
            }
        }
        if (isInWishlist.isInWishlist===false)
         {
            const data={
              wishlistId:0,
              userId:userid,
              productId:Pid,
              isInWishlist:true
            }
             const url="https://localhost:7041/api/Wishlist/CreateWishlist";
             try{
              const response = await axios.post(url,data );
              alert("axios done");
              console.log(response);
              if(response.status === 200)
              {
               alert("axios adding wishlist done");
               await GetWishList();
                toast.success("item added to wishlist");
                return;
              }
             }
             catch(error)
             {
              alert("catch hitted");
              console.error('handleaddtowishlist axios error',error);
             }
            }
            
      }
      
      const isProductInWishlist = (productId) => {
        return wishlistData.some(item => item.productId === productId);
      };

      const isProductInWishlist2 = (productId) => {
        for (let i = 0; i < wishlistData.length; i++) {
          if (wishlistData[i].productId === productId) {
            return { isInWishlist: true, index: i };
          }
        }
        return { isInWishlist: false, index: -1 };
      };

    return (
                <>
                <Nav/>
                <div className="wishlistpage-container">
                    <h3 className="wishlist-page-heading" style={{fontSize:'30px', fontWeight:'bolder'}}>Wish List <span style={{ fontSize: '15px', fontWeight:'normal' }} >({filteredProduct.length} results)</span></h3>
                    <div className='productbox'>
                    <ToastContainer/>
                        <div className='wishlistproductbox-container'>
                        {
                            filteredProduct.map((curElm) => 
                              {
                                const selectedSize = selectedSizes[curElm.productId];
                                const selectedPrice = curElm.sizeOfEachUnits.includes(Number(selectedSize))
                                  ? curElm.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(Number(selectedSize))]
                                  : '';
                                  const isInWishlist = isProductInWishlist(curElm.productId);

                                
                                  return(
                                      <>
                                      <Card className='product-card'>
                                      <div onClick={()=>handleaddorremovewishlist(curElm.productId)} className={`overlay-icon ${isModalOpen ? 'hidden' : ''}`}>
                            <li style={{ backgroundColor: isInWishlist ? 'green' : '' }}><AiOutlineHeart className='li-icon' /></li>
                                    </div>
                                      <Card.Img variant="top" src={`data:image/jpeg;base64,${curElm.base64Image}`} alt={curElm.Title} />
                                      <Card.Body className='product-card-body'>
                                        <Card.Title className='product-card-title'>{curElm.productName}</Card.Title>
                                        <Card.Text className='product-card-text'>
                                                <div className='Price-QtyDiv'>
                                                {/*}      <h4>${product.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(selectedSize)]}</h4> */}
                                                <h4>$ {selectedPrice}</h4>
                                                {filteredProduct.length > 0 && (
                                                  <select value={selectedSize} onChange={(e) => handleDropdownChange(curElm.productId, e.target.value)} className='QuantitySelectDropdown'>
                                                  {curElm.sizeOfEachUnits.map((size) => (
                                                    <option key={size} value={size}>{size} {curElm.unit}</option>
                                                  ))}
                                                </select> )}
                                                </div>
                                        </Card.Text>
                                        <div className='product-buttons-div'>
                                        <button className='products-AddToCartBtn' >Add to Cart</button>
                                          <button className='products-SubscribeBtn' onClick={() => handleSubscribeClick(curElm,selectedPrice)}>subscribe</button>
                                          </div>
                                      </Card.Body>
                                    </Card>

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

export default MyWishlist;
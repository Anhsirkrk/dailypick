import React, { useState,useEffect} from "react";
import Nav from "../Components/Nav";
import '../Css/mywishlist.css';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
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


const MyCart =()=>{

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

     const [wishlistIds, setWishlistIds] = useState([]);
     const [cartlistData,setCartListData]= useState([]);
     const [wishlistData,setWishListData]= useState([]);
     const [cartIds, setCartIds] = useState([]);
     const [userid,setUserId]=useState('');
     const [usercartid,setUserCartId]=useState('');

     const [showCartDataIndex, setShowCartDataIndex] = useState(null);

     const token = localStorage.getItem('token');
     console.log("from getdailyneed",token);
     //alert(token);
     const bearer = `bearer` + " " + token;
     const tokenStartIndex = 8; // Assuming the token starts after "bearer "
     const formattedBearer = `bearer`+ " "+ bearer.substring(tokenStartIndex, bearer.length - 1); // Remove the last character (quote)
     
     
     //alert(formattedBearer);
     console.log(formattedBearer);

     const location = useLocation();
     const navigate = useNavigate();
    
  
  
    
    useEffect(()=>{
          // Get item from local storage on component mount
    const storeddata = localStorage.getItem('userdata');
    if (storeddata) {
    const storeduserdata = JSON.parse(storeddata);
    console.log('storeduseerdata',storeduserdata);
      setUserId(storeduserdata.userId);
      setUserCartId(storeduserdata.cartId)
    }
      // Call GetWishList only if userid is available
  if (userid) {
    GetWishList();
    GetCartsList();
  }
       },[userid]);
       console.log('userid',userid);
       console.log('usercartid',usercartid);
       console.log('cart page wihlistdata',wishlistData);
       console.log('cart page wishlists id;s',wishlistIds);
       console.log('cart page cartdata',cartlistData);
       console.log('cart page cartdata id;s',cartIds);
 

  
      const handleaddnewproduct = ()=>{
        navigate('/products');
      }


      const GetCartsList = async () => {
        alert(userid);
        if(userid){
          if(userid)
    {    
          try{
            const url = `https://localhost:7041/api/Cart/GetCartItemsBasedOnUserId?userid=${userid}`;

          axios.get(url, {
            headers: {
                
              'Authorization': formattedBearer,
              'Content-Type': 'application/json',
              // Add other necessary headers
            },
          }).then((result)=>{

            console.log(result.data);
            // Initialize selected sizes with the first size for each product
            const initialSelectedSizes = {};
            const initialSelectedPrices ={};
            
            result.data.forEach(item => {
    initialSelectedSizes[item.productId] = item.sizeOfEachUnits[0];
    initialSelectedPrices[item.productId] = item.priceOfEachUnits[0]; // Assuming the first price is the default
  });

  setSelectedSizes(initialSelectedSizes);
  setSelectedPrices(initialSelectedPrices);

      // Set the initial price when products are loaded
      if (result.data.length > 0) {
        setSelectedproductPrice(result.data[0].priceOfEachUnits[0]);
      }
    
            setCartListData(result.data);
            setFilteredProduct(result.data);
            localStorage.removeItem('cartlistdata');
            localStorage.setItem('cartlistdata', JSON.stringify(result.data));
       
          })
          .catch((error)=>{
            console.log(error);
          })
        }
          catch (error) {
                  alert("hitte getcartList catch");
                  console.error('Getcartlist axios error', error);
               }
              }
              else{
                alert("jwt token not found");
              }
        
      }
      else{
        alert("user id not found");
      }
     
      };
      console.log('setcartlistdata',cartlistData);

        
      // const GetSubscriptionsList = async () => {
      //   alert(userid);
      //   if (userid) {
        
         
      //     const url = `https://localhost:7041/api/User/GetUserSubscribedProducts?userid=${userid}`;

      //     const data = {
      //       userId:userid,
      //     }
      //     try {
      //        alert("hitte get subsc tyry");
      //       const response = await axios.get(url);
      //       console.log('API Response:', response.data); 
      //       // const parsedData = JSON.parse(response.data);
      //          // Update the wishlist data state
      //          setSubscriptionListData(response.data);
      //          setFilteredProduct(response.data);
               
      //       localStorage.removeItem('subscriptionlistdata');
      //       localStorage.setItem('subscriptionlistdata', JSON.stringify(response.data));
      //     } catch (error) {
      //       alert("hitte getsubscList catch");
      //       console.error('Getsubscriptionlist axios error', error);
      //     }
      //   }
      // };
      console.log('setcartlistdata',cartlistData);

    // const handlesusbcriptiondata=(index)=>{
    //   setShowSubscriptionDataIndex(!showSubscriptiondata);
    // }


    
    const handleSubscribeClick = (curElm,selectedPrice) => {
      setSelectedProduct({ ...curElm, selectedPrice }); // Include selectedPrice in the selectedProduct object
      setShowModal(true);
      setIsModalOpen(true);
      localStorage.setItem("selectedproductandSelectedPrice", JSON.stringify(curElm));
      localStorage.setItem("selectedproductprice",JSON.stringify(selectedPrice));
      var selproduct = (localStorage.getItem('selectedproductandSelectedPrice'));
      var selproductprice = (localStorage.getItem('selectedproductprice'));
      console.log("selectedProdutcprice:",selproductprice);
    };
   // console.log("selectedprice",selectedProduct.productName);
    console.log("selectedProdutc:",selectedProduct);


    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedProduct(null);
      setIsModalOpen(false);
    };

    const handleDropdownChange = (productId, newSize) => {
      const selectedProduct = cartlistData.find(p => p.sizeOfEachUnits.includes(Number(newSize)));
      const selectedPrice = selectedProduct ? selectedProduct.priceOfEachUnits[selectedProduct.sizeOfEachUnits.indexOf(Number(newSize))] : '';
    
      setSelectedSizes(prevSelectedSizes => ({
        ...prevSelectedSizes,
        [productId]: newSize
      }));
    }



    useEffect(() => {
      if (isModalOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    
      return () => {
        document.body.classList.remove('modal-open');
      };
    }, [isModalOpen]);


    const handleaddorremovewishlist= async (Pid)=>{
      if(formattedBearer)
      {
      // Id.preventDefault();
     // alert(Pid);
      //alert("handleaddtowishlist hitted");
      const isInWishlist = isProductInWishlist2(Pid);
      alert(isInWishlist);
      
      //alert(isInWishlist);
      console.log(isInWishlist);
    
      if (isInWishlist.isInWishlist===true)
       {
        alert("true hitted");
          const data={
            wishlistId:0,
            userId:userid,
            productId:Pid,
            isInWishlist:false
          }
          const url="https://localhost:7041/api/Wishlist/CreateWishlist";
          try{
            alert("axios begining in true hitted");
            const response = await axios.post(url,data, {
              headers: {
                  
                'Authorization': formattedBearer,
                'Content-Type': 'application/json',
                // Add other necessary headers
              }
            });
            //alert("axios done");
            console.log(response);
            if(response.status === 200)
            {
            //alert("axios rem wishlist done");
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
        alert("fasle hitted");
        alert(userid);
        alert(Pid);
          const data={
            wishlistId:0,
            userId:userid,
            productId:Pid,
            isInWishlist:true
          }
           const url="https://localhost:7041/api/Wishlist/CreateWishlist";
          
        console.log(formattedBearer);
           try{
            alert("axios begining in false hitted");
            const response = await axios.post(url, data, {
              headers: {
                  
                'Authorization': formattedBearer,
                'Content-Type': 'application/json',
                // Add other necessary headers
              },
            });
            alert("axios done");
            console.log(response);
            if(response.status === 200)
            {
             //alert("axios adding wishlist done");
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
        else{
          alert("formated token not available for the handleaddorremovewishlist")
        }
    }
    
    const handleaddorremovecartlist= async (Pid)=>{
      //alert("handleaddorremove acrt list hitted");
      if(formattedBearer)
      {
      // Id.preventDefault();
     // alert(Pid);
      //alert("handleaddtoCartlist hitted");
      const isInCartlist = isProductInCartlist2(Pid);
      //alert(isInCartlist);
      
      //alert(isInCartlist);
      console.log(isInCartlist);
    
      if (isInCartlist.isInCartlist===true)
       {
       // alert("isincartlist true hitted");
          const data={
            userId: userid,
            cartId: usercartid,
            productId: Pid,
            quantity: 0,
            selectedSizeOfItem: 0,
            price: 0,
          }
          const url="https://localhost:7041/api/Cart/DeletecartItem";
          try{
            //alert("dleetfrom cart axios begining in true hitted");
            const response = await axios.post(url,data, {
              headers: {
                  
                'Authorization': formattedBearer,
                'Content-Type': 'application/json',
                // Add other necessary headers
              }
            });
           // alert("axios done");
            console.log(response);
            if(response.status === 200)
            {
           // alert("axios rem cartlist done");
            await GetCartsList();
              toast.error("item removed from Cart");
            
            }
          }
          catch(error)
          {
            alert("catch hitted");
            console.error('handleremovecartlist axios error',error);
          }
      }
      if (isInCartlist.isInCartlist===false)
       {
       // alert("isincartlist fasle hitted");
       // alert(userid);
       // alert(Pid);
          const data={
            userId: userid,
            cartId: usercartid,
            productId: Pid,
            quantity: 0,
            selectedSizeOfItem: 0,
            price: 0,
          }
           const url="https://localhost:7041/api/Cart/AddItemToCart";
          
        console.log(formattedBearer);
           try{
           // alert("addingcartlist axios begining in false hitted");
            const response = await axios.post(url, data, {
              headers: {
                  
                'Authorization': formattedBearer,
                'Content-Type': 'application/json',
                // Add other necessary headers
              },
            });
            alert("axios done");
            console.log(response);
            if(response.status === 200)
            {
            // alert("axios adding cartlist done");
             await GetCartsList();
              toast.success("item added to cartlist");
              return;
            }
           }
           catch(error)
           {
            alert("catch hitted");
            console.error('handleaddtocartlist axios error',error);
           }
          }
        }
        else{
          alert("formated token not available for the handleaddorremovewishlist")
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
    
    
    const isProductInCartlist = (productId) => {
     // alert("isproductincartlist hitted");
      return cartlistData.some(item => item.productId === productId);
    };
    
    
    const isProductInCartlist2 = (productId) => {
     // alert("isproductincartlist2 hitted");
      for (let i = 0; i < cartlistData.length; i++) {
        if (cartlistData[i].productId === productId) {
          return { isInCartlist: true, index: i };
        }
      }
      return { isInCartlist: false, index: -1 };
    };


    const handlesingleproduct=(productId)=>{
      console.log(productId);
        navigate(`/singleproduct?productId=${productId}`);
      };



    const handlecartdata = (index) => {
      setShowCartDataIndex(prevIndex => prevIndex === index ? null : index);

      const handleDropdownChange = (productId, newSize) => {
        const selectedProduct = cartlistData.find(p => p.sizeOfEachUnits.includes(Number(newSize)));
        const selectedPrice = selectedProduct ? selectedProduct.priceOfEachUnits[selectedProduct.sizeOfEachUnits.indexOf(Number(newSize))] : '';
      
        setSelectedSizes(prevSelectedSizes => ({
          ...prevSelectedSizes,
          [productId]: newSize
        }));
      }
  }

  
  const GetWishList = async () => {
    // alert(userid);
    // alert('get wish list hitted');
    if (userid) {
      if(formattedBearer){

      const url = `https://localhost:7041/api/Wishlist/GetUserWishlistProducts?userid=${userid}`;
      try {
        //  alert("hitte getwishkist tyry");
        const response = await axios.get(url, {
          headers: {
              
            'Authorization': formattedBearer,
            'Content-Type': 'application/json',
            // Add other necessary headers
          },});
        console.log('API Response:', response.data); 
        // const parsedData = JSON.parse(response.data);
           // Update the wishlist data state
           setWishListData(response.data);
        localStorage.removeItem('wishlistdata');
        localStorage.setItem('wishlistdata', JSON.stringify(response.data));
      } catch (error) {
        alert("hitte getwishkist catch");
        console.error('GetWishList axios error', error);
      }
    }else{
      alert("jwt formatted bearer not recieved fro getting wishlist");
    }
    }
    else{
      alert("user id not recieved fro getting wishlist");
    }
  };
  console.log('setwishlistdata',wishlistData);

    return (
                <>
                <Nav/>
                <div className="wishlistpage-container">
                    <h3 className="wishlist-page-heading" style={{fontSize:'30px', fontWeight:'bolder'}}>Cart Items <span style={{ fontSize: '15px', fontWeight:'normal' }} >({cartlistData.length} results)</span></h3>
                    <div className='productbox'>
                    <ToastContainer/>
                        <div className='productbox-container'>
                        {
                          filteredProduct.map((curElm,index) => 
                              {const selectedSize = selectedSizes[curElm.productId];
                                const selectedPrice = curElm.sizeOfEachUnits.includes(Number(selectedSize))
                                  ? curElm.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(Number(selectedSize))]
                                  : '';
                                  const isInWishlist = isProductInWishlist(curElm.productId);
                                  const isInCartlist = isProductInCartlist(curElm.productId);

                                  return(
                                      <>
                                      <div className="mysubscription-product-card-container">
                                      <Card className='product-card'>
                                      <div onClick={()=>handleaddorremovewishlist(curElm.productId)} className={`overlay-icon ${isModalOpen ? 'hidden' : ''}`}>
                                      <li style={{ backgroundColor: isInWishlist ? 'green' : '' }}><AiOutlineHeart className='li-icon' /></li>
                                    </div>
                                                                      
                                       <Card.Img variant="top" src={`data:image/jpeg;base64,${curElm.base64Image}`} alt={curElm.Title} onClick={()=>handlesingleproduct(curElm.productId)} />
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
                              <button className='products-AddToCartBtn' onClick={()=>handleaddorremovecartlist(curElm.productId)} style={{ backgroundColor: isInCartlist ? '' : '' }} >Remove  { <FaCartShopping /> }</button>
                              <button className='products-SubscribeBtn' onClick={() => handleSubscribeClick(curElm,selectedPrice)}>subscribe</button>
                                </div>
                                     
                                      </Card.Body>
                                    </Card>
                                    
                                  
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
                {selectedProduct && (
                  <SubscriptionModal
                    product={selectedProduct}
                    Priceofselectedproduct={selectedProduct.selectedPrice}
                    handleClose={handleCloseModal}
                  />
                )}
                </>
    )
}

export default MyCart;
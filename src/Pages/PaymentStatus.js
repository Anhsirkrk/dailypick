import React,{useState,useEffect} from 'react';
import Nav from '../Components/Nav';
import '../Css/Paymentstatus.css';
import paymentsuccessimage from '../Images/payment-done 1.png';
import paymentfailedimage from '../Images/paymentfailed.png';
import sampleimage from '../Images/Dummy/Heritage_Milk_1.png';
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import axios, { all } from 'axios';
import { useLocation } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import {IoIosArrowForward} from 'react-icons/io';
import {IoIosArrowDown} from 'react-icons/io';




const PaymentStatus = () => {

    const[paymentstatus,setpaymentstatus]=useState('');


    const [filteredProduct, setFilteredProduct] = useState([]);
    const [product,setProduct]=useState([]);
    const [selectedSizes, setSelectedSizes] = useState({}); 
    const [selectedPrices, setSelectedPrices] = useState({}); 
    const [selectedproductPrice, setSelectedproductPrice] = useState([]);
    const [wishlistData,setWishListData]= useState([]);
    const location = useLocation();
    const [userid,setUserId]=useState('');

    const navigate = useNavigate();


    useEffect(() => {
      // Get item from local storage on component mount
      const storeddata = localStorage.getItem('userdata');
      if (storeddata) {
        const storeduserdata = JSON.parse(storeddata);
        setUserId(storeduserdata.userId);
      }
      // Call GetWishList only if userid is available
      if (userid)
      {
        GetWishList();
      }
      GetAllProducts();
    }, [userid]);

    const GetAllProducts =()=>{
        // alert("getall products hitted");
        const url = "https://localhost:7041/api/Admin/GetAllProducts";
        axios.get(url)
        .then((response)=>{
          console.log(response.data);
       // Initialize selected sizes with the first size for each product
       const initialSelectedSizes = {};
       const initialSelectedPrices ={};
    
       response.data.forEach(item => {
        initialSelectedSizes[item.productId] = item.sizeOfEachUnits[0];
        initialSelectedPrices[item.productId] = item.priceOfEachUnits[0]; // Assuming the first price is the default
      });
    
      setSelectedSizes(initialSelectedSizes);
      setSelectedPrices(initialSelectedPrices);
    
         // Set the initial price when products are loaded
         if (response.data.length > 0) {
          setSelectedproductPrice(response.data[0].priceOfEachUnits[0]);
        }
        console.log(window.location.state && window.location.state.brand);
         console.log(window.location.state && window.location.state.category);
         const category = location.state && location.state.category;
    const brand = location.state && location.state.brand;
        
        if (category) 
        {
          setFilteredProduct(response.data.filter(item => item.categoryName === category));
          setProduct(response.data);
        } 
        else 
        {
          if(brand){
            setFilteredProduct(response.data.filter(item => item.brandName === brand));
            console.log(filteredProduct);
            setProduct(response.data);
          }
          else
        {
          setFilteredProduct(response.data);
          setProduct(response.data);
        }}});
     }
     


     const filtterproduct = (category) =>
     {
         const update = product.filter((x) => 
         {
            return x.categoryName === category;
         })
         setFilteredProduct(update);
     }

     const GetWishList = async () => {
        // alert(userid);
        // alert('get wish list hitted');
        if (userid) {
          const url = `https://localhost:7041/api/Wishlist/GetUserWishlistProducts?userid=${userid}`;
          try {
            //  alert("hitte getwishkist tyry");
            const response = await axios.get(url);
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
        }
      };


     const filterProducts = (categories, brands, ratings) => {
        let filtered = product;
        if (categories.length > 0) {
          filtered = filtered.filter(item => categories.includes(item.categoryName));
        }
        if (brands.length > 0) {
          filtered = filtered.filter(item => brands.includes(item.brandName));
        }
        if (ratings.length > 0) {
          filtered = filtered.filter(item => ratings.includes(item.rating));
        }
    
        setFilteredProduct(filtered);
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

 

//back to home button

const handlebacktohome =()=>{
  navigate('/home2');
}



//show orders

const [showPaymentOrder, setShowPaymentOrder] = useState(false);

  const handleYourOrder = () => {
    // Toggle the state to show/hide 'payment-order-div'
    setShowPaymentOrder(!showPaymentOrder);
  };


 //show payment summary 


 const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  const handlepaymentsummary = () => {
    // Toggle the state to show/hide 'payment-order-div'
    setShowPaymentSummary(!showPaymentSummary);
  };

  return (
    <>
    <Nav/>
    <div className='payment-status'>
        <div className='payment-status-dialog-box'>
            <div>
                <div className='payment-status-image-div'>

                {paymentstatus === 'success' ? 
                  (<img className='payment-status-image' src={paymentsuccessimage} alt='payment-success-image' />) 
                  :
                  (<img className='payment-status-image' src={paymentfailedimage} alt='payment-failed-image' />)
                }

                </div>
                <div className='payment-status-message'>
                
                {paymentstatus === 'success' ? 
                  (
                    <div>
                      <h4 className='Success'>Payment successful</h4>
                      <p>The order confirmation has been sent to your number</p>
                    </div>
                  ) 
                  : 
                  (
                    <div>
                      <h4 className='Failed'>Oh no, your Payment Failed</h4>
                      <p className='failed-message'>Don't worry, your money is safe! If money was debited from your account, it will be refunded automatically in 5-7 working days.</p>
                    </div>
                  )
                }

                    
                    
                </div>
            </div>
            <div className='line'>
                <hr/>
            </div>
            <div className='your-order' onClick={handleYourOrder}>Your Orders {showPaymentOrder ? <IoIosArrowDown /> : <IoIosArrowForward />}</div>
            {showPaymentOrder && (
            <div className='payment-order-div'>
                
                <div className='my-orders-div'>
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
                            <Card className='Paymentstatus-product-card'>
                            {/* <div >
                              <li style={{ backgroundColor: isInWishlist ? 'green' : '' }}><AiOutlineHeart className='li-icon' /></li>
                            </div> */}
                            <Card.Img className='Paymentstatus-product-card-image' variant="top" src={`data:image/jpeg;base64,${curElm.base64Image}`} alt={curElm.Title} />
                            <Card.Body className='Paymentstatus-product-card-body'>
                              <Card.Title className='Paymentstatus-product-card-title'><h4 className='payment-product-title'>{curElm.productName}</h4><p className='payment-product-size'>({selectedSize} {curElm.unit})</p></Card.Title>
                              {/* <Card.Text className='Paymentstatus-product-card-text'>
                                      <div className='Paymentstatus-Price-QtyDiv'> */}
                                      {/*}      <h4>${product.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(selectedSize)]}</h4> */}
                                      {/* <h4 className='paymnet-product-price'>$ {selectedPrice}</h4> */}
                                      {/* {filteredProduct.length > 0 && (
                                        <p className='Paymentstatus-SelectedSize'> {selectedSize} {curElm.unit}</p>
                                        )} */}
                                      {/* {filteredProduct.length > 0 && ( 
                                        <select value={selectedSize} className='Paymentstatus-QuantitySelectDropdown'>
                                        {curElm.sizeOfEachUnits.map((size) => (
                                          <option key={size} value={size}>{size} {curElm.unit}</option>
                                        ))}
                                      </select> )} */}
                                      {/* </div>
                              </Card.Text> */}
                            </Card.Body>
                          </Card>
                       
                            </>
                        )
                    })
                }
                </div>
            </div>
            )}
            <div className='payment-summary-div'>
                <div className='your-order' onClick={handlepaymentsummary}>Payment summary {showPaymentOrder ? <IoIosArrowDown /> : <IoIosArrowForward />}</div>
                {showPaymentSummary && (
                <div className='payment-summary-deytails'>
                  <h4 className='payment-id'><strong>Payment Id:</strong>MOJO7404005A55294472</h4>
                  <h4 className='payment-date'><strong>Time:</strong>Oct 04, 2023 at 4:50pm</h4>
                </div>
                )}

            </div>
            <div className='payment-button-field'>
                <button className='paymnet-done' type='button'>Done</button>
                <button className='paymnet-go-to-home' type='button' onClick={handlebacktohome}>Go to Home</button>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default PaymentStatus

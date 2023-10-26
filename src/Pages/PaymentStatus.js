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

  


    const [filteredProduct, setFilteredProduct] = useState([]);
    const [product,setProduct]=useState([]);
    const [selectedSizes, setSelectedSizes] = useState({}); 
    const [selectedPrices, setSelectedPrices] = useState({}); 
    const [selectedproductPrice, setSelectedproductPrice] = useState([]);
    const [wishlistData,setWishListData]= useState([]);
    const location = useLocation();
    const [userid,setUserId]=useState('');

    const navigate = useNavigate();



//local storage




const [paymentTransactionId, setPaymentTransactionId] = useState('');
const [paymentStatus, setPaymentStatus] = useState('');
const [paymentId, setPaymentId] = useState('');

const [selectedProduct, setSelectedProduct] = useState([]);
const [selectedProductId, setSelectedProductId] = useState('');
const [productIndividualPrice, setProductIndividualPrice] = useState('');
const [quantityOfProduct, setQuantityOfProduct] = useState('');
const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('');
const [selectedStartDate, setSelectedStartDate] = useState('');
const [selectedEndDate, setSelectedEndDate] = useState('');
const [selectedSizeOfProduct, setSelectedSizeOfProduct] = useState('');
const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
const [selectedProductOrderId, setSelectedProductOrderId] = useState('');

const [selectedProductUserSubscriptionId, setSelectedProductUserSubscriptionId] = useState('');
const [selectedAddressId, setSelectedAddressId] = useState('');
const [selectedAddressPinCode, setSelectedAddressPinCode] = useState('');
const [orderSelectedSupplierId, setOrderSelectedSupplierId] = useState('');


const [selectedsubscriptionplan, setSelectedSubscriptionPlan] = useState('');





useEffect(()=>{
  setPaymentTransactionId(localStorage.getItem('order-SelectedProductPaymentTransactionId'))
  console.log(paymentTransactionId)
  setPaymentStatus(localStorage.getItem('order-SelectedProductPaymentStatus'))
  setPaymentId(localStorage.getItem('order-SelectedProductPaymentId'))


  setSelectedProduct(localStorage.getItem('selectedproduct'))
  console.log(selectedProduct);
  setSelectedProductId(localStorage.getItem('order-selectedproductId'))
  setProductIndividualPrice(localStorage.getItem('order-productindividualprice'))
  setQuantityOfProduct(localStorage.getItem('order-quantityofproduct'))
  setSelectedSubscriptionType(localStorage.getItem('order-selectedsubscriptiontype'))
  setSelectedStartDate(localStorage.getItem('order-selectedStartdate'))
  setSelectedEndDate(localStorage.getItem('order-selectedEnddate'))
  setSelectedSizeOfProduct(localStorage.getItem('order-selectedSizeofproduct'))
  setSelectedTimeSlot(localStorage.getItem('order-selectedtimeslot'))
  setSelectedProductOrderId(localStorage.getItem('order-SelectedProductOrderId')) 


  setSelectedProductUserSubscriptionId(localStorage.getItem('order-SelectedProductUserSubscriptionId'))
  setSelectedAddressId(localStorage.getItem('order-SelectedAddressIDforSubscription'))
  setSelectedAddressPinCode(localStorage.getItem('order-SelectedAddressPincodeforSubscription'))
  setOrderSelectedSupplierId(localStorage.getItem('order-SelectedorderSupplierIdforSubscription'))


})
   




      const isProductInWishlist = (productId) => {
         return wishlistData.some(item => item.productId === productId);
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

                {paymentStatus === 'success' ? 
                  (<img className='payment-status-image' src={paymentsuccessimage} alt='payment-success-image' />) 
                  :
                  (<img className='payment-status-image' src={paymentfailedimage} alt='payment-failed-image' />)
                }

                </div>
                <div className='payment-status-message'>
                
                {paymentStatus === 'success' ? 
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
                  selectedProduct.map((curElm) => 
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
                  <h4 className='payment-id'><strong>Payment Id:</strong>{paymentTransactionId}</h4>
                  <h4 className='payment-date'><strong>Time:</strong>Oct 04, 2023 at 4:50pm</h4>
                </div>
                )}

            </div>
            <div className='payment-button-field'>
                <button className='paymnet-done' type='button' onClick={handlebacktohome}>Done</button>
                <button className='paymnet-go-to-home' type='button' onClick={handlebacktohome}>Go to Home</button>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default PaymentStatus

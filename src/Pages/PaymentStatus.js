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

    const currentDate = new Date();
   
    const location = useLocation();
    const [userid,setUserId]=useState('');

    const navigate = useNavigate();


//local storage

const [paymentTransactionId, setPaymentTransactionId] = useState('');
const [paymentStatus, setPaymentStatus] = useState('success');
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
     
      setPaymentStatus(localStorage.getItem('order-SelectedProductPaymentStatus'))
      
      setPaymentId(localStorage.getItem('order-SelectedProductPaymentId'))
      
      const storedProduct = JSON.parse(localStorage.getItem('selectedproduct'));
      
        setSelectedProduct(storedProduct);
    
      console.log(storedProduct);
      
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

},[]);
   

console.log(JSON.parse(localStorage.getItem('selectedproduct')));
console.log(localStorage.getItem('order-productindividualprice'));
console.log(localStorage.getItem('order-quantityofproduct'));
console.log(localStorage.getItem('order-TotalAmounttobePaid'));
console.log(localStorage.getItem('order-SelectedProductPaymentTransactionId'));
console.log(localStorage.getItem('order-SelectedProductPaymentStatus'));

console.log(paymentTransactionId)
console.log(paymentStatus)
console.log(paymentId)
console.log(selectedProduct)
console.log(selectedProductId)
console.log(productIndividualPrice)
console.log(quantityOfProduct)
console.log(selectedSubscriptionType)
console.log(selectedStartDate)
console.log(selectedEndDate)
console.log(selectedSizeOfProduct)
console.log(selectedTimeSlot)
console.log(selectedProductOrderId)
console.log(selectedProductUserSubscriptionId)
console.log(selectedAddressId)
console.log(selectedAddressPinCode)
console.log(orderSelectedSupplierId)

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
                {selectedProduct.length === 0 ?(
                  <p>No products selected</p>
                ):(
                  selectedProduct.map((curElm) => 
                    {
                      return(
                        <>
                          <Card className='Paymentstatus-product-card'>
                            <Card.Img className='Paymentstatus-product-card-image' variant="top" src={`data:image/jpeg;base64,${curElm.base64Image}`} alt={curElm.Title} />
                            <Card.Body className='Paymentstatus-product-card-body'>
                              <Card.Title className='Paymentstatus-product-card-title'><h4 className='payment-product-title'>{curElm.productName}</h4><p className='payment-product-size'>({selectedSizeOfProduct})</p></Card.Title>
                            </Card.Body>
                        </Card>
                        </>
                      )
                    })
                )}
                </div>
            </div>
            )}
            <div className='payment-summary-div'>
                <div className='your-order' onClick={handlepaymentsummary}>Payment summary {showPaymentOrder ? <IoIosArrowDown /> : <IoIosArrowForward />}</div>
                {showPaymentSummary && (
                <div className='payment-summary-deytails'>
                  <h4 className='payment-id'><strong>Payment Id:</strong>{paymentTransactionId}</h4>
                  <h4 className='payment-date'><strong>Time:</strong>{currentDate.toDateString()}</h4>
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

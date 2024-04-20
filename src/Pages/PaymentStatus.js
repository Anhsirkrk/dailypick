import React,{useState,useEffect} from 'react';
import Nav from '../Components/Nav';
import '../Css/Paymentstatus.css';
import paymentsuccessimage from '../Images/payment-done 1.png';
import paymentfailedimage from '../Images/paymentfailed.png';
import sampleimage from '../Images/Dummy/Heritage_Milk_1.png';
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import axios, { all } from 'axios';
import { json, useLocation } from 'react-router-dom';
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
const [paymentStatus, setPaymentStatus] = useState('Success');
const [paymentId, setPaymentId] = useState('');
const [useremail,setUserEmail]= useState('');

const [selectedProduct, setSelectedProduct] = useState([]);
const [selectedProductId, setSelectedProductId] = useState('');
const [productIndividualPrice, setProductIndividualPrice] = useState('');
const [quantityOfProduct, setQuantityOfProduct] = useState('');
const [totalAmounttobePaid,setTotalAmounttobePaid]=useState('');
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

const [storeddata,setStoreddata]=useState([]);

const token = localStorage.getItem('token');
console.log("from getdailyneed",token);
//alert(token);
const bearer = `bearer` + " " + token;
const tokenStartIndex = 8; // Assuming the token starts after "bearer "
const formattedBearer = `bearer`+ " "+ bearer.substring(tokenStartIndex, bearer.length - 1); // Remove the last character (quote)


//alert(formattedBearer);
console.log(formattedBearer);






useEffect(()=>{

   const userdata= JSON.parse(localStorage.getItem('userdata'));
   //alert(userdata.email);
   setUserEmail(userdata.email);
 
    
  
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

      const storedSubscriptionType = localStorage.getItem('order-selectedsubscriptiontype');

      // Map numeric values to subscription types
    const subscriptionTypes = {
      1: 'Single Day',
      2: 'Weekly',
      3: 'Monthly'
    };

     // Set selected subscription type based on the numeric value
     if (storedSubscriptionType && subscriptionTypes[storedSubscriptionType]) {
      setSelectedSubscriptionType(subscriptionTypes[storedSubscriptionType]);
    }
      
      setSelectedStartDate(localStorage.getItem('order-selectedStartdate'))

      const storedStartDate = localStorage.getItem('order-selectedStartdate');

      if (storedStartDate) {
        const parsedStartDate = new Date(storedStartDate);
        
        // Format the date as "Wed Nov 01 2023"
        const formattedStartDate = parsedStartDate.toDateString();
        setSelectedStartDate(formattedStartDate);

      }

      setSelectedEndDate(localStorage.getItem('order-selectedEnddate'))

      const storedEndDate = localStorage.getItem('order-selectedEnddate');

      if (storedEndDate) {
        const parsedEndDate = new Date(storedEndDate);
        
        // Format the date as "Wed Nov 01 2023"
        const formattedEndtDate = parsedEndDate.toDateString();
        setSelectedEndDate(formattedEndtDate);

      }
      
      setSelectedSizeOfProduct(localStorage.getItem('order-selectedSizeofproduct'))
      
      setSelectedTimeSlot(localStorage.getItem('order-selectedtimeslot'))
      
      setSelectedProductOrderId(localStorage.getItem('order-SelectedProductOrderId')) 
      
    
    
      setSelectedProductUserSubscriptionId(localStorage.getItem('order-SelectedProductUserSubscriptionId'))
      
      setSelectedAddressId(localStorage.getItem('order-SelectedAddressIDforSubscription'))
      
      setSelectedAddressPinCode(localStorage.getItem('order-SelectedAddressPincodeforSubscription'))
      
      setOrderSelectedSupplierId(localStorage.getItem('order-SelectedorderSupplierIdforSubscription'))

      const recieveddata = localStorage.getItem('userdata');
      setStoreddata(JSON.parse(recieveddata));

      setTotalAmounttobePaid((localStorage.getItem('order-TotalAmounttobePaid')));

      
},[storeddata.userId]);

console.log(storeddata.userId);
console.log(paymentStatus);
console.log(productIndividualPrice);
console.log(useremail);

const SendEmail = async () => {
 
 
  if (storeddata.userId && paymentStatus && totalAmounttobePaid && useremail) {
    try {
    
const url = `https://localhost:7041/api/Payment/PaymentStatusEmail`;
const data={
  userid:storeddata.userId,
  paymentStatus:paymentStatus,
  amount:totalAmounttobePaid.toString(),
  email:useremail
}

alert(" headers done ");  
alert(formattedBearer);
      const response = await axios.post(url,data,{
        headers: { 
          'Authorization': formattedBearer,
          'Content-Type': 'application/json',
          // Add other necessary headers
        }
            });
        alert('axioos done');
        console.log("Email sent successfully:", response);
    
    } 
    catch (error)
     {
      alert('axioos not done');
      console.error("Error sending email:", error);
    }
  } else {
    console.error("User ID, payment status, and product individual price are required fields.");
  }
};

   const handlemail =()=>{
    
    SendEmail();
   }

console.log(storeddata);
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
                  {paymentStatus === 'Success' ? 
                    (<img className='payment-status-image' src={paymentsuccessimage} alt='payment-success-image' />) 
                    :
                    (<img className='payment-status-image' src={paymentfailedimage} alt='payment-failed-image' />)
                  }
                </div>
                <div className='payment-status-message'>
                  {paymentStatus === 'Success' ? 
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
            <div className='paymentstatus-subscriptionplan-details'>
                  <p>Selected Plan:{selectedSubscriptionType} from :{selectedStartDate} to:{selectedEndDate}</p>
                </div>
            <div className='your-order' onClick={handleYourOrder}>Your Orders {showPaymentOrder ? <IoIosArrowDown /> : <IoIosArrowForward />}</div>
            {showPaymentOrder && (
            <div className='payment-order-div'>
                 
                <div className='my-orders-div'>
                {selectedProduct.length === 0 ?(
                  <p>No products selected</p>
                ):
                (
                  <>
                    <Card className='Paymentstatus-product-card'>
                      <Card.Img className='Paymentstatus-product-card-image' variant="top" src={`data:image/jpeg;base64,${selectedProduct.base64Image}`} alt={selectedProduct.Title} />
                      <Card.Body className='Paymentstatus-product-card-body'>
                        <Card.Title className='Paymentstatus-product-card-title'><h4 className='payment-product-title'>{selectedProduct.productName}</h4><p className='payment-product-size'>({selectedSizeOfProduct})</p></Card.Title>
                      </Card.Body>
                    </Card>
                  </>
                )
                
                }
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
                <button onClick={handlemail}>sendmail</button>
                <button className='paymnet-go-to-home' type='button' onClick={handlebacktohome}>Go to Home</button>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default PaymentStatus



























// (
                //   selectedProduct.map((curElm) => 
                //     {
                //       return(
                //         <>
                //           <Card className='Paymentstatus-product-card'>
                //             <Card.Img className='Paymentstatus-product-card-image' variant="top" src={`data:image/jpeg;base64,${curElm.base64Image}`} alt={curElm.Title} />
                //             <Card.Body className='Paymentstatus-product-card-body'>
                //               <Card.Title className='Paymentstatus-product-card-title'><h4 className='payment-product-title'>{curElm.productName}</h4><p className='payment-product-size'>({selectedSizeOfProduct})</p></Card.Title>
                //             </Card.Body>
                //         </Card>
                //         </>
                //       )
                //     })
                // )
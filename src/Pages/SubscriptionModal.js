import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Css/SubscriptionModal.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaUnderline } from 'react-icons/fa';
import { Link, useAsyncError, useNavigate } from "react-router-dom";



const SubscriptionModal = ({ product,Priceofselectedproduct,subscriptiontypes,handleClose }) => {
  console.log(product);
  console.log(Priceofselectedproduct);
  console.log(product.selectedPrice);

  const [subscriptionType, setSubscriptionType] = useState(null);
  const [selectedproductPrice,setSelectedproductPrice] = useState('');
  const [selectedSizeofproduct, setSelectedSizeofproduct]= useState([]);
  const [quantityofproduct,setQuantityOfProduct]= useState(1);
  const [subscriptionTypesData , setsubscriptionTypesData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [actualsingleDayPrice,setActualSingleDayPrice]= useState('');
  const [discountedsingleDayPrice,setDiscountedSingleDayPrice]= useState('');
  const [finalsingleDayPrice,setFinalSingleDayPrice]= useState('');
  const [actualweekDayPrice,setActualweekDayPrice]= useState('');
  const [discountedweekPrice,setDiscountedweekPrice]= useState('');
  const [finalweekPrice,setFinalweekPrice]= useState('');
  const [actualmonthPrice,setActualmonthPrice]= useState('');
  const [discountedmonthPrice,setDiscountedmonthPrice]= useState('');
  const [finalmonthPrice,setFinalmonthPrice]= useState('');
  const [weeklyPrice,setWeeklyPrice]=useState('');
  const [monthyPrice,setMonthlyPrice]=useState('');

  const [amounttobepaid,setAmounttobePaid] = useState('');
  const [selectedsubscriptionplan,SetSelectedsetSubscriptionplan]= useState('');
  const [selectedfinalsizeofproduct,setSelectedFinalSizeofProduct]= useState('');
  const [selectedfinalQtyofproduct,setFinalQtyofProduct]= useState('');

  const [show,setShow]=useState(true);

  const navigate = useNavigate();


 const GetSubscriptioTypes =()=>{
  const URL= "https://localhost:7041/api/Admin/GetSubscriptionTypes";
  axios.get(URL)
  .then((result)=>{
    const susbcription = result.data;
    setsubscriptionTypesData(susbcription);
  })
  console.log(subscriptionTypesData);
 }
 const subscriptionWithId1 = subscriptionTypesData.find(subscription => subscription.subscriptionId === 1);
 const subscriptionName1 = subscriptionWithId1 ? subscriptionWithId1.subscriptionType1 : '';
 const subscriptionWithId2 = subscriptionTypesData.find(subscription => subscription.subscriptionId === 2);
 const subscriptionName2 = subscriptionWithId2 ? subscriptionWithId2.subscriptionType1 : '';
 const subscriptionWithId3 = subscriptionTypesData.find(subscription => subscription.subscriptionId === 3);
 const subscriptionName3 = subscriptionWithId3 ? subscriptionWithId3.subscriptionType1 : '';

  useEffect(()=>{ 
    const selectedSize = product.priceOfEachUnits.includes(Number(Priceofselectedproduct)) ? product.sizeOfEachUnits[product.priceOfEachUnits.indexOf(Number(Priceofselectedproduct))] : "";
    const selectedPrice = product.sizeOfEachUnits.includes(Number(selectedSize))
      ? product.priceOfEachUnits[product.sizeOfEachUnits.indexOf(Number(selectedSize))]
      : '';
      setSelectedproductPrice(selectedPrice);
      setSelectedSizeofproduct(selectedSize);
      GetSubscriptioTypes();

  },[]);
  console.log(selectedproductPrice);
  console.log(selectedSizeofproduct);
  console.log(subscriptionTypesData);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    if(cardId===1){
      SetSelectedsetSubscriptionplan(1);
    }
    if(cardId===2){
      SetSelectedsetSubscriptionplan(2);
    }
    if(cardId===3){
      SetSelectedsetSubscriptionplan(3);
    }
  }
  console.log(`selecetdplan ${selectedsubscriptionplan}`);

  const handleSubscribe = () => {
    // Implement your logic for subscribing here
    if (selectedsubscriptionplan) {

      if(selectedsubscriptionplan===1){
        setAmounttobePaid(discountedsingleDayPrice);
        localStorage.setItem('selectedproductPrice', discountedsingleDayPrice);
      }
      if(selectedsubscriptionplan===2){
        setAmounttobePaid(discountedweekPrice);
        localStorage.setItem('selectedproductPrice', discountedweekPrice);
      }
      if(selectedsubscriptionplan===3){
        setAmounttobePaid(discountedmonthPrice);
        localStorage.setItem('selectedproductPrice', discountedmonthPrice);
      }
      setSelectedFinalSizeofProduct(selectedSizeofproduct);
      setFinalQtyofProduct(quantityofproduct);

       // Save the required state variables to localStorage
    localStorage.setItem('selectedSizeofproduct', selectedSizeofproduct);
    localStorage.setItem('quantityofproduct', quantityofproduct);
      alert(`Subscribed to ${selectedsubscriptionplan} plan for ${product.productName}  totalamount${amounttobepaid} finaqty${selectedfinalQtyofproduct} finalsize${selectedfinalsizeofproduct}`);
      navigate('/location');
    } else {
      alert('Please select a subscription plan.');
    }
  };
  console.log(`amounttobepaid${amounttobepaid}`);
  console.log(`finalqty${selectedfinalQtyofproduct}`);
  console.log(`finalsize${selectedfinalsizeofproduct}`);

  const handleDropdownChange = (productId, newSize) => {
    const selectedPrice = product ? product.priceOfEachUnits[product.sizeOfEachUnits.indexOf(Number(newSize))] : '';
    setSelectedproductPrice(selectedPrice);
    setSelectedSizeofproduct(newSize);
    
  }
  const handlequantityincrement = () => {
    setQuantityOfProduct(prevQuantity => prevQuantity + 1);
  }
  const handlequantitydecrement = () => {
    if (quantityofproduct > 1) {
      setQuantityOfProduct(prevQuantity => prevQuantity - 1);
    }
  }

  const updatingprices=()=>{
  
    setActualSingleDayPrice(quantityofproduct*selectedproductPrice);
    setDiscountedSingleDayPrice(Math.round((quantityofproduct*selectedproductPrice)*1));

    setActualweekDayPrice(quantityofproduct*selectedproductPrice*7);
    setDiscountedweekPrice(Math.round((quantityofproduct*selectedproductPrice*7)*0.95));

    setActualmonthPrice(quantityofproduct*selectedproductPrice*30);
    setDiscountedmonthPrice(Math.round((quantityofproduct*selectedproductPrice*30)*0.9));
  }
  
  useEffect(()=>{
   updatingprices();
  },[handleDropdownChange,handlequantitydecrement,handlequantityincrement]);

  return (
    <>

    <Modal className='susbcriptionmodal'  show={show} onHide={handleClose}>
    <Modal.Header className='susbcriptionmodal-header' >
      <Modal.Title className='susbcriptionmodal-Title'><h2>Select your Subscription</h2></Modal.Title>
    </Modal.Header>
    <Modal.Body className='susbcriptionmodal-body'>
    <div className='productbox-container'>
                        <Card className='subscriptionmodal-product-card'>
                        <Card.Body className='product-card-body'>
                        <div className='productcard-imagediv' >
                          <img src={`data:image/jpeg;base64,${product.base64Image}`} alt={product.Title}></img>
                          </div>
                          <div className='Price-QtyDiv'>
                          <h2>{product.productName}</h2>
                          <div className='priceAndSizeDiv'>
                          <h4>$ {selectedproductPrice}</h4>
                          {product && (
                            <select value={selectedSizeofproduct} onChange={(e) => handleDropdownChange(product.productId, e.target.value)} className='QuantitySelectDropdown'>
                            {product.sizeOfEachUnits.map((size) => (
                              <option key={size} value={size}>{size} {product.unit}</option>
                            ))}
                          </select> )}
                          </div>
                          <div className='quantity-incredecre'>
                          <Button className='btn-decre' onClick={handlequantitydecrement}>-</Button>
                          <div className='qtyvaluediv'><p className='qtyvalue'>{quantityofproduct}</p>
                          </div>
                           
                          <Button className='btn-incre' onClick={handlequantityincrement}>+</Button>
                          </div>
                          </div>
                        </Card.Body>
                      </Card>                 
              </div>
              <div className='SubscriptionTypes-div'>
              {subscriptionTypesData && (
                <>
              <Card  key={1}
              className={`subscription-type-card ${selectedCard === 1 ? 'selected' : ''}`}
              style={{ width: '18rem' }}
              onClick={() => handleCardClick(1)}>
              <Card.Body>
                <Card.Title><Button className='subscriptiontype-button'>{subscriptionName1}</Button></Card.Title>
                <Card.Text className='subscription-type-card-text'>
                  <div className='susbcriptionpricedeiv'>
                  <h2 className='susbcriptiontotalprice'>{discountedsingleDayPrice}</h2>
                  <div className='susbcriptiondiscount-div'>
                  <h5 >{}</h5>
                  <h4 ></h4>
                  </div>
                  </div>
                </Card.Text>
                 
              </Card.Body>
            </Card>    
            <Card  key={2}
            className={`subscription-type-card ${selectedCard === 2 ? 'selected' : ''}`}
            style={{ width: '18rem' }}
            onClick={() => handleCardClick(2)}>
            <Card.Body>
              <Card.Title><Button className='subscriptiontype-button'>{subscriptionName2}</Button></Card.Title>
              <Card.Text className='subscription-type-card-text'>
              <div className='susbcriptionpricedeiv'>
              <h2 className='susbcriptiontotalprice'>{discountedweekPrice}</h2>
              <div className='susbcriptiondiscount-div'>
              <h5 >{actualweekDayPrice}</h5>
              <h4 >5% off</h4>
              </div>
              </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card  key={3}
          className={`subscription-type-card ${selectedCard === 3 ? 'selected' : ''}`}
          style={{ width: '18rem' }}
          onClick={() => handleCardClick(3)}>
          <Card.Body>
            <Card.Title className='subscription-type-card-title'><Button className='subscriptiontype-button'>{subscriptionName3}</Button></Card.Title>
            <Card.Text className='subscription-type-card-text'>
            <div className='susbcriptionpricedeiv'>
            <h2 className='susbcriptiontotalprice'>{discountedmonthPrice}</h2>
            <div className='susbcriptiondiscount-div'>
            <h5 >{actualmonthPrice}</h5>
            <h4 >5% off</h4>
            </div>
            </div>
            </Card.Text>
          </Card.Body>
        </Card>
        </>
        )}
              </div>

      
    </Modal.Body>
    <Modal.Footer className='susbcriptionmodal-footer'>
          <div className='subscriptionModal-btndiv'>
          <Button className='subscriptionmodal-closeBtn' variant="secondary" onClick={handleClose}>Close </Button>
            <Button className='subscriptionmodal-Addtocartbtn' >Add to Cart</Button>
            <Button  className='subscriptionmodal-paynowbtn' onClick={handleSubscribe}>Subscribe</Button>
          </div>
      
      
    </Modal.Footer>
  </Modal>




    </>
  );
};

export default SubscriptionModal;

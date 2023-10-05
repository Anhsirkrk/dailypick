import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Css/SubscriptionModal.css';
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';


const SubscriptionModal = ({ product,Priceofselectedproduct,subscriptiontypes,handleClose }) => {
  console.log(product);
  console.log(Priceofselectedproduct);
  console.log(product.selectedPrice);

  const [subscriptionType, setSubscriptionType] = useState(null);
  const [selectedproductPrice,setSelectedproductPrice] = useState('');
  const [selectedSizeofproduct, setSelectedSizeofproduct]= useState([]);
  const [show,setShow]=useState(true);


  useEffect(()=>{ 
    const selectedSize = product.priceOfEachUnits.includes(Number(Priceofselectedproduct)) ? product.sizeOfEachUnits[product.priceOfEachUnits.indexOf(Number(Priceofselectedproduct))] : "";
    const selectedPrice = product.sizeOfEachUnits.includes(Number(selectedSize))
      ? product.priceOfEachUnits[product.sizeOfEachUnits.indexOf(Number(selectedSize))]
      : '';
      setSelectedproductPrice(selectedPrice);
      setSelectedSizeofproduct(selectedSize);

  },[]);
  console.log(selectedproductPrice);
  console.log(selectedSizeofproduct);



  const handleSubscribe = () => {
    // Implement your logic for subscribing here
    if (subscriptionType) {
      alert(`Subscribed to ${subscriptionType} plan for ${product.productName}`);
    } else {
      alert('Please select a subscription plan.');
    }
  };

  const handleDropdownChange = (productId, newSize) => {
    const selectedPrice = product ? product.priceOfEachUnits[product.sizeOfEachUnits.indexOf(Number(newSize))] : '';
    setSelectedproductPrice(selectedPrice);
    setSelectedSizeofproduct(newSize);
  }



  return (
    <>

    <Modal className='susbcriptionmodal'  show={show} onHide={handleClose}>
    <Modal.Header className='susbcriptionmodal-header' closeButton>
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
                          <Button className='btn-decre'>-</Button>
                          <div className='qtyvaluediv'><p className='qtyvalue'>1</p>
                          </div>
                           
                          <Button className='btn-incre'>+</Button>
                          </div>
                          </div>
                          
      
                        </Card.Body>
                      </Card> 
                
              </div>
      
    </Modal.Body>
    <Modal.Footer className='susbcriptionmodal-footer'>
          <div className='subscriptionModal-btndiv'>
          <Button className='subscriptionmodal-closeBtn' variant="secondary" onClick={handleClose}>Close </Button>
            <Button className='subscriptionmodal-Addtocartbtn' onClick={handleSubscribe}>Add to Cart</Button>
            <Button  className='subscriptionmodal-paynowbtn' onClick={handleSubscribe}>Subscribe</Button>
          </div>
      
      
    </Modal.Footer>
  </Modal>




{/*}
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{product.productName}</h2>
        <img src={`data:image/jpeg;base64,${product.base64Image}`} alt={product.Title} />
        <h3>Price: ${selectedPrice}</h3>
        <div>
          <label>
            <input type="radio" name="subscription" value="daily" onChange={() => setSubscriptionType('Daily')} />
            Daily
          </label>
          <label>
            <input type="radio" name="subscription" value="weekly" onChange={() => setSubscriptionType('Weekly')} />
            Weekly
          </label>
          <label>
            <input type="radio" name="subscription" value="monthly" onChange={() => setSubscriptionType('Monthly')} />
            Monthly
          </label>
        </div>
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
  </div>

                          <Card.Img variant="top" src={`data:image/jpeg;base64,${product.base64Image}`} alt={product.Title} />
                          <Card.Title className='product-card-title'>{product.productName}</Card.Title>



*/}
    </>
  );
};

export default SubscriptionModal;

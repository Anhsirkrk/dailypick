import React,{useState} from 'react';
import Nav from '../Components/Nav';
import '../Css/Paymentstatus.css';
import paymentsuccessimage from '../Images/payment-done 1.png';
import paymentfailedimage from '../Images/paymentfailed.png';
import sampleimage from '../Images/Dummy/Heritage_Milk_1.png';
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import axios, { all } from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentStatus = () => {


    const [filteredProduct, setFilteredProduct] = useState([]);
    const [product,setProduct]=useState([]);
    const [selectedSizes, setSelectedSizes] = useState({}); 
  const [selectedPrices, setSelectedPrices] = useState({}); 
  const [selectedproductPrice, setSelectedproductPrice] = useState([]);
  const [wishlistData,setWishListData]= useState([]);
  const location = useLocation();
  const [userid,setUserId]=useState('');



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

 
  return (
    <>
    <Nav/>
    <div className='payment-status'>
        <div className='payment-status-dialog-box'>
            <div>
                <div className='payment-status-image-div'>
                    {/* <img className='payment-status-image' src={paymentsuccessimage} alt='payment-status-image'/> */}
                    <img className='payment-status-image' src={paymentfailedimage} alt='payment-status-image'/> 
                </div>
                <div className='payment-status-message'>
                    {/* <h4 className='Success'>Payment successful</h4> */}
                    <h4 className='Failed'>Oh no, your Payment Failed</h4>
                    {/* <p>The order confirmation has been sent to your number</p> */}
                    <p className='failed-message'>Don't worry your money is safe! If money was debited from your account, it will be refunded automatically in 5-7 working days.</p>
                </div>
            </div>
            <div className='line'>
                <hr/>
            </div>
            <div className='payment-order-div'>
                <div className='your-order'>Your Orders</div>
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
                            <Card className='product-card'>
                            <div >
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
                                        <select value={selectedSize} className='QuantitySelectDropdown'>
                                        {curElm.sizeOfEachUnits.map((size) => (
                                          <option key={size} value={size}>{size} {curElm.unit}</option>
                                        ))}
                                      </select> )}
                                      </div>
                              </Card.Text>
                            </Card.Body>
                          </Card>
                       
                            </>
                        )
                    })
                }
                </div>
            </div>
            <div className='payment-summary-div'>
                <div className='your-order'>Payment summary</div>
            </div>
            <div className='payment-button-field'>
                <button className='paymnet-done' type='button'>Done</button>
                <button className='paymnet-go-to-home' type='button'>Go to Home</button>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default PaymentStatus
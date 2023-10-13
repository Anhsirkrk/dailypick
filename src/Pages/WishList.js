import React, { useState,useEffect} from "react";
import Nav from "../Components/Nav";
import '../Css/wishlist.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from '../Pages/ProductDetail';
import '../Css/Products.css';
import axios, { all } from 'axios';
import SubscriptionModal  from '../Pages/SubscriptionModal';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




const Wishlist =()=>{

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
     const location = useLocation();
     const navigate = useNavigate();
    
    
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
    
    
    const AllProducts = () => 
    {
        setFilteredProduct(product);
    }

    useEffect(()=>{
        GetAllProducts();
       },[]);
    
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

    return (
                <>
                <Nav/>
                <div className="wishlistpage-container">
                    <h3 className="wishlist-page-heading" style={{fontSize:'30px', fontWeight:'bolder'}}>Wish List <span style={{ fontSize: '15px', fontWeight:'normal' }} >({filteredProduct.length} results)</span></h3>
                    <div className='productbox'>
            
                        <div className='wishlistproductbox-container'>
                        {
                            filteredProduct.map((curElm) => 
                              {
                                const selectedSize = selectedSizes[curElm.productId];
                                const selectedPrice = curElm.sizeOfEachUnits.includes(Number(selectedSize))
                                  ? curElm.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(Number(selectedSize))]
                                  : '';

                                  return(
                                      <>
                                      <Card className='product-card'>
                                      <div className={`overlay-icon ${isModalOpen ? 'hidden' : ''}`}>
                                     <li><AiOutlineHeart className='li-icon' /></li>
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

export default Wishlist;
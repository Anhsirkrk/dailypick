import React, { useState,useEffect } from 'react';
import Nav from '../Components/Nav';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from '../Pages/ProductDetail';
import '../Css/Products.css';
import axios from 'axios';
import SubscriptionModal  from '../Pages/SubscriptionModal';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import HeritageCurd1 from '../Images/Dummy/Heritage_Curd_1 copy.jpg';

const Products = ({detail, view, close, setClose, addtocart}) => {

  const [product,setProduct]=useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); 
  const [selectedPrices, setSelectedPrices] = useState({}); 
   const [selectedproductPrice, setSelectedproductPrice] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const location = useLocation();


  const GetAllProducts =()=>{
    alert("getall products hitted");
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
      alert("categ if hitted");
      setFilteredProduct(response.data.filter(item => item.categoryName === category));
      setProduct(response.data);
    } 
    else 
    {
      if(brand){
        alert("brand if hitted");
        setFilteredProduct(response.data.filter(item => item.brandName === brand));
        console.log(filteredProduct);
        setProduct(response.data);
      }
      else
    {
      alert("laste else hitted");
      setFilteredProduct(response.data);
      setProduct(response.data);
    }}});
 }

   console.log(filteredProduct);
   console.log(product);
   
    useEffect(()=>{
      GetAllProducts();
     },[]);

    const handleSubscribeClick = (curElm) => {
      setSelectedProduct(curElm);
      console.log(selectedProduct);
      alert(selectedproductPrice);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedProduct(null);
    };
  
    const filtterproduct = (category) =>
    {
        const update = product.filter((x) => 
        {
           return x.categoryName === category;
        })
        setFilteredProduct(update);
    }

    const AllProducts = () => 
    {
        setFilteredProduct(product);
    }

    
      const handleDropdownChange = (productId, newSize) => {
        //    const newSize = e.target.value;
        // setSelectedSize(newSize);
        const selectedProduct = filteredProduct.find(p => p.sizeOfEachUnits.includes(Number(newSize)));
        const selectedPrice = selectedProduct ? selectedProduct.priceOfEachUnits[selectedProduct.sizeOfEachUnits.indexOf(Number(newSize))] : '';
        setSelectedproductPrice(selectedPrice);
        setSelectedSizes(prevSelectedSizes => ({
          ...prevSelectedSizes,
          [productId]: newSize
        }));
      }



  return (
    <>
    <Nav/>
    <div className='products'>
    <div className='products-container'>
        <div className='filter'>
            <div className='categories'>
                <h3>categories</h3>
                <ul>
                <li onClick={() =>  AllProducts ()}>All Products</li>
                    <li onClick={() => filtterproduct ("Milk")}>Milk</li>
                    <li onClick={() => filtterproduct ("Curd")}>Curd</li>
                    <li onClick={() => filtterproduct ("Vegetables")}>Vegetables</li>
                    <li onClick={() => filtterproduct ("Fruits")}>Fruits</li>
                    <li onClick={() => filtterproduct ("NewsPapers")}>News Papers</li>
                   
                </ul>
            </div>
            <div className='Brand'>
            <h3>Brand</h3>
            <ul>
            <li onClick={() =>  AllProducts ()}>All Products</li>
                <li onClick={() => filtterproduct ("Milk")}>Milk</li>
                <li onClick={() => filtterproduct ("Curd")}>Curd</li>
                <li onClick={() => filtterproduct ("Vegetables")}>Vegetables</li>
                <li onClick={() => filtterproduct ("Fruits")}>Fruits</li>
                <li onClick={() => filtterproduct ("NewsPapers")}>News Papers</li>
               
            </ul>
        </div>
        </div>
        <div className='productbox'>
        <h3 style={{fontSize:'30px', fontWeight:'bolder'}}>All Products  <span style={{ fontSize: '15px', fontWeight:'normal' }} >({filteredProduct.length} results)</span> </h3>

            <div className='productbox-container'>
                {
                  filteredProduct.map((curElm) => 
                    {
                      const selectedSize = selectedSizes[curElm.productId];
                      const selectedPrice = curElm.sizeOfEachUnits.includes(Number(selectedSize))
                        ? curElm.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(Number(selectedSize))]
                        : '';
             
                      console.log(selectedPrice);
                        return(
                            <>
                            <Card className='product-card'>
                            <div className='overlay-icon'>
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
                              <button className='products-AddToCartBtn' onClick={() => handleSubscribeClick(curElm)}>Add to Cart</button>
                                <button className='products-SubscribeBtn' onClick={() => handleSubscribeClick(curElm)}>subscribe</button>
                                </div>
                            </Card.Body>
                          </Card>
                       
                            </>
                        )
                    })
                }
               
            </div>
            
        </div>
        
    </div>
    
</div>
{selectedProduct && (
  <SubscriptionModal
    product={selectedProduct}
    selectedPrice={selectedproductPrice}
    handleClose={handleCloseModal}
  />
)}

    </>
    
  )
}

export default Products
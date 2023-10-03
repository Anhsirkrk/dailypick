import React, { useState,useEffect } from 'react';
import Nav from '../Components/Nav';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from '../Pages/ProductDetail';
import '../Css/Products.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SubscriptionModal  from '../Pages/SubscriptionModal';

const Products = ({detail, view, close, setClose, addtocart}) => {

  const [product,setProduct]=useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); 
  const [selectedPrices, setSelectedPrices] = useState({}); 
   const [selectedproductPrice, setSelectedproductPrice] = useState('');
   const [showModal, setShowModal] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);



  const GetAllProducts =()=>{
    const url = "https://localhost:7041/api/Admin/GetAllProducts";
    axios.get(url)
    .then((response)=>{
      console.log(response.data);
      setProduct(response.data);
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
  });
 }

   
    
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
        const update = Productdetail.filter((x) => 
        {
           return x.Cat === category;
        })
        setProduct(update);
    }

    const AllProducts = () => 
    {
        setProduct(Productdetail)
    }

    
    const buyOnce = (product) => {
        // Add the selected product to the cart (you need to implement this logic)
        addtocart(product);
    
        // Redirect to the cart page
        //navigate('/cart'); // Assuming your cart route is '/cart'
      };

      const [selectedValue, setSelectedValue] = useState(1);

      const handleDropdownChange = (productId, newSize) => {
        //    const newSize = e.target.value;
        // setSelectedSize(newSize);
        const selectedProduct = product.find(p => p.sizeOfEachUnits.includes(Number(newSize)));
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
    <div className='container'>
        <div className='filter'>
            <div className='categories'>
                <h3>categories</h3>
                <ul>
                <li onClick={() => AllProducts ()}>All Products</li>
                    <li onClick={() => filtterproduct ("Milk")}>Milk</li>
                    <li onClick={() => filtterproduct ("Curd")}>Curd</li>
                    <li onClick={() => filtterproduct ("Ghee")}>Ghee</li>
                    <li onClick={() => filtterproduct ("Apple")}>Apple</li>
                    <li onClick={() => filtterproduct ("Promogranate")}>Promogranate</li>
                    <li onClick={() => filtterproduct ("Pineapple")}>Pineapple</li>
                    <li onClick={() => filtterproduct ("Banana")}>Banana</li>
                </ul>
            </div>
        </div>
        <div className='productbox'>
        <h3 style={{fontSize:'30px', fontWeight:'bolder'}}>All Products  <span style={{ fontSize: '15px', fontWeight:'normal' }} >({product.length} results)</span> </h3>
            <div className='contant'>
                {
                    product.map((curElm) => 
                    {
                      const selectedSize = selectedSizes[curElm.productId];
                      const selectedPrice = curElm.sizeOfEachUnits.includes(Number(selectedSize))
                        ? curElm.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(Number(selectedSize))]
                        : '';
             
                      console.log(selectedPrice);
                        return(
                            <>
                                <div className='box' key={curElm.productId}>
                                    <div className='img_box'>
                                      <div className='icon'>
                                        <li><AiOutlineHeart className='li-icon' /></li>                                     
                                      </div>
                                      <img src={`data:image/jpeg;base64,${curElm.base64Image}`} alt={curElm.Title}></img>
                                    </div>

                                    <div className='detail'>
                                     {/*} <p>{curElm.Cat}</p> */}
                                     <h3>{curElm.productName}</h3>
                                     <div className='Price-QtyDiv'>
                                              {/*}      <h4>${product.priceOfEachUnits[curElm.sizeOfEachUnits.indexOf(selectedSize)]}</h4> */}
                                              <h4>$ {selectedPrice}</h4>
                                              {product.length > 0 && (
                                                <select value={selectedSize} onChange={(e) => handleDropdownChange(curElm.productId, e.target.value)} className='QuantitySelectDropdown'>
                                                {curElm.sizeOfEachUnits.map((size) => (
                                                  <option key={size} value={size}>{size} ML</option>
                                                ))}
                                              </select> )}
                                     </div>

                                        <div className='product-buttons-div'>
                                        <button className='products-AddToCartBtn' onClick={() => handleSubscribeClick(curElm)}>Add to Cart</button>

                                          <button className='products-SubscribeBtn' onClick={() => handleSubscribeClick(curElm)}>subscribe</button>
                                          </div>

                                    </div>
                
                                  </div>
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
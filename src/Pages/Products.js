import React, { useState,useEffect } from 'react';
import Nav from '../Components/Nav';
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
import HeritageCurd1 from '../Images/Dummy/Heritage_Curd_1 copy.jpg';
import {ToastContainer,toast } from 'react-toastify';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Products = ({detail, view, close, setClose, addtocart}) => {

  const [product,setProduct]=useState([]);
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
   const [wishlistData,setWishListData]= useState([]);
   const [wishlistIds, setWishlistIds] = useState([]);
   const [userid,setUserId]=useState('');


   const GetWishList = async () => {
    alert(userid);
    alert('get wish list hitted');
    if (userid) {
      const url = `https://localhost:7041/api/Wishlist/GetUserWishlistProducts?userid=${userid}`;
      try {
         alert("hitte getwishkist tyry");
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
  console.log('setwishlistdata',wishlistData);

 
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
  console.log('userid',userid);
  console.log('prod oage wihlistdata',wishlistData);
  console.log('prod oage wishlists id;s',wishlistIds);



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

   console.log(filteredProduct);
   console.log(product);


    const handleSubscribeClick = (curElm,selectedPrice) => {
      setSelectedProduct({ ...curElm, selectedPrice }); // Include selectedPrice in the selectedProduct object
      setShowModal(true);
      setIsModalOpen(true);
    };
    console.log(selectedProduct);

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedProduct(null);
      setIsModalOpen(false);
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
        const selectedProduct = filteredProduct.find(p => p.sizeOfEachUnits.includes(Number(newSize)));
        const selectedPrice = selectedProduct ? selectedProduct.priceOfEachUnits[selectedProduct.sizeOfEachUnits.indexOf(Number(newSize))] : '';
      
        setSelectedSizes(prevSelectedSizes => ({
          ...prevSelectedSizes,
          [productId]: newSize
        }));
      }

      const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
          ? selectedCategories.filter(item => item !== category)
          : [...selectedCategories, category];
    
        setSelectedCategories(updatedCategories);
        filterProducts(updatedCategories, selectedBrands, selectedRatings);
      }

      const handleBrandChange = (brand) => {
        const updatedBrands = selectedBrands.includes(brand)
          ? selectedBrands.filter(item => item !== brand)
          : [...selectedBrands, brand];
    
        setSelectedBrands(updatedBrands);
        filterProducts(selectedCategories, updatedBrands, selectedRatings);
      }

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

      useEffect(() => {
  if (isModalOpen) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }

  return () => {
    document.body.classList.remove('modal-open');
  };
}, [isModalOpen]);


const handleaddorremovewishlist= async (Pid)=>{
  // Id.preventDefault();
  alert(Pid);
  alert("handleaddtowishlist hitted");
  const isInWishlist = isProductInWishlist2(Pid);
  alert(isInWishlist);
  console.log(isInWishlist);
  if (isInWishlist.isInWishlist===true)
   {
      const data={
        wishlistId:0,
        userId:userid,
        productId:Pid,
        isInWishlist:false
      }
      const url="https://localhost:7041/api/Wishlist/CreateWishlist";
      try{
        const response = await axios.post(url,data );
        alert("axios done");
        console.log(response);
        if(response.status === 200)
        {
        alert("axios rem wishlist done");
        await GetWishList();
          toast.error("item removed from wishlist");
        
        }
      }
      catch(error)
      {
        alert("catch hitted");
        console.error('handleaddtowishlist axios error',error);
      }
  }
  if (isInWishlist.isInWishlist===false)
   {
      const data={
        wishlistId:0,
        userId:userid,
        productId:Pid,
        isInWishlist:true
      }
       const url="https://localhost:7041/api/Wishlist/CreateWishlist";
       try{
        const response = await axios.post(url,data );
        alert("axios done");
        console.log(response);
        if(response.status === 200)
        {
         alert("axios adding wishlist done");
         await GetWishList();
          toast.success("item added to wishlist");
          return;
        }
       }
       catch(error)
       {
        alert("catch hitted");
        console.error('handleaddtowishlist axios error',error);
       }
      }
      
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
    <div className='products'>
    <div className='products-container'>
    <ToastContainer/>
        <div className='filter'>
            <div className='categories'>
                <h3>categories</h3>
                <ul>
                <li>
                    <input type="checkbox" id="milk" onChange={() => handleCategoryChange("Milk")} />
                    <label htmlFor="milk">Milk</label>
                </li>
                <li>
                    <input type="checkbox" id="curd" onChange={() => handleCategoryChange("Curd")} />
                    <label htmlFor="curd">Curd</label>
                </li>
                <li>
                    <input type="checkbox" id="vegetables" onChange={() => handleCategoryChange("Vegetables")} />
                    <label htmlFor="vegetables">Vegetables</label>
                </li>
                <li>
                    <input type="checkbox" id="fruits" onChange={() => handleCategoryChange("Fruits")} />
                    <label htmlFor="fruits">Fruits</label>
                </li>
                <li>
                    <input type="checkbox" id="newsPapers" onChange={() => handleCategoryChange("NewsPapers")} />
                    <label htmlFor="newsPapers">News Papers</label>
                </li>
            </ul>
            </div>
            <div className='Brand'>
            <h3>Brand</h3>
            <ul>
         
            <li>
                <input type="checkbox" id="milk" onChange={() => handleBrandChange("Heritage")} />
                <label htmlFor="milk">Heritage</label>
            </li>
            <li>
                <input type="checkbox" id="curd" onChange={() => handleBrandChange("Thirumala")} />
                <label htmlFor="curd">Thirumala</label>
            </li>
            <li>
                <input type="checkbox" id="vegetables" onChange={() => handleBrandChange("Hindusthan Times")}/>
                <label htmlFor="vegetables">Hindusthan Times</label>
            </li>
            <li>
                <input type="checkbox" id="fruits" onChange={() => handleBrandChange("Times Of India")} />
                <label htmlFor="fruits">Times Of India</label>
            </li>
            <li>
                <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("Egg Plant")} />
                <label htmlFor="newsPapers">Egg Plant</label>
            </li>
            <li>
                <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("Safal")} />
                <label htmlFor="newsPapers">Safal</label>
            </li>
            <li>
                <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("Milky Mist")} />
                <label htmlFor="newsPapers">Milky Mist</label>
             </li>
            <li>
                <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("Nestle")} />
                <label htmlFor="newsPapers">Nestle</label>
             </li>
            <li>
              <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("ITC")} />
              <label htmlFor="newsPapers">ITC</label>
            </li>
            <li>
              <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("Hatsun")} />
              <label htmlFor="newsPapers">Hatsun</label>
            </li>
            <li>
              <input type="checkbox" id="newsPapers" onChange={() => handleBrandChange("Nature's Basket")} />
              <label htmlFor="newsPapers">Nature's Basket</label>
            </li>
        </ul>
            </div>
        <div className='Rating'>
        <h3>Rating</h3>
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
                        const isInWishlist = isProductInWishlist(curElm.productId);
                      
                        return(
                            <>
                            <Card className='product-card'>
                            <div onClick={()=>handleaddorremovewishlist(curElm.productId)} className={`overlay-icon ${isModalOpen ? 'hidden' : ''}`}>
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
               
            </div>
            
        </div>
        
    </div>
    
</div>
{selectedProduct && (
  <SubscriptionModal
    product={selectedProduct}
    Priceofselectedproduct={selectedProduct.selectedPrice}
    handleClose={handleCloseModal}
  />
)}

    </>
    
  )
}

export default Products



// const isProductInWishlist = (productId) => {
//   for (let i = 0; i < wishlistData.length; i++) {
//     // alert(i);
//     // alert(wishlistData.length);
//     if (wishlistData[i].productId === productId) {
//       return true;
//     }
//   }
//   return false;
// };
// const isProductInWishlist = (productId) => {
//   for (let i = 0; i < wishlistData.length; i++) {
//     if (wishlistData[i].productId === productId) {
//       return { isInWishlist: true, index: i };
//     }
//   }
//   return { isInWishlist: false, index: -1 };
// };
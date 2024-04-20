import React,{useState,useEffect} from 'react'
import Nav from '../Components/Nav';
import '../Css/SingleProduct.css'
import pic from '../Images/Dummy/Heritage_Milk_1.png'
import pic1 from '../Images/Dummy/Heritage_Milk_2.jpg'
import { AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';


const SingleProduct = (productId) => {

    const [productname] = useState('Heritage Daily Health Toned Milk');
    const [quantity] = useState(''); // Unused state

    const images = [pic, pic1, pic, pic, pic1, pic, pic1, pic, pic1, pic]; // Simplified images array
    const image = [pic, pic, pic];

    const token = localStorage.getItem('token');
    console.log("from getdailyneed",token);
    //alert(token);
    const bearer = `bearer` + " " + token;
    const tokenStartIndex = 8; // Assuming the token starts after "bearer "
    const formattedBearer = `bearer`+ " "+ bearer.substring(tokenStartIndex, bearer.length - 1); // Remove the last character (quote)
    
    
    //alert(formattedBearer);
    console.log(formattedBearer);

const [product,setProduct]=useState('');

    useEffect(()=>{
        console.log(productId);
        Getproduct(productId);
        
    },[]);

const Getproduct=async (productId)=>{

    const url='https://localhost:7041/api/Admin/GetProductById';
    const data={
        Id:productId
    }
    try{

        axios.get(url,data, {
            headers: { 
              'Authorization': formattedBearer,
              'Content-Type': 'application/json',
              // Add other necessary headers
            }, })
        .then((result) => {
          console.log('API Response:', result.data); 
          setProduct(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
       

    }
    catch(error){
        console.log(error);
    }
}

    // const handleaddorremovewishlist= async (Pid)=>{
    //     // Id.preventDefault();
    //     alert(Pid);
    //     alert("handleaddtowishlist hitted");
    //     const isInWishlist = isProductInWishlist2(Pid);
    //     alert(isInWishlist);
    //     console.log(isInWishlist);
    //     if (isInWishlist.isInWishlist===true)
    //      {
    //         const data={
    //           wishlistId:0,
    //           userId:userid,
    //           productId:Pid,
    //           isInWishlist:false
    //         }
    //         const url="https://localhost:7041/api/Wishlist/CreateWishlist";
    //         try{
    //           const response = await axios.post(url,data );
    //           alert("axios done");
    //           console.log(response);
    //           if(response.status === 200)
    //           {
    //           alert("axios rem wishlist done");
    //           await GetWishList();
    //             toast.error("item removed from wishlist");
              
    //           }
    //         }
    //         catch(error)
    //         {
    //           alert("catch hitted");
    //           console.error('handleaddtowishlist axios error',error);
    //         }
    //     }
    //     if (isInWishlist.isInWishlist===false)
    //      {
    //         const data={
    //           wishlistId:0,
    //           userId:userid,
    //           productId:Pid,
    //           isInWishlist:true
    //         }
    //          const url="https://localhost:7041/api/Wishlist/CreateWishlist";
    //          try{
    //           const response = await axios.post(url,data );
    //           alert("axios done");
    //           console.log(response);
    //           if(response.status === 200)
    //           {
    //            alert("axios adding wishlist done");
    //            await GetWishList();
    //             toast.success("item added to wishlist");
    //             return;
    //           }
    //          }
    //          catch(error)
    //          {
    //           alert("catch hitted");
    //           console.error('handleaddtowishlist axios error',error);
    //          }
    //         }
            
    //   }

  return (
    <>
      <Nav/>
      <div className='product-display'>
        <div className='product-image'>
        {/* <div onClick={()=>handleaddorremovewishlist(curElm.productId)} className={`overlay-icon ${isModalOpen ? 'hidden' : ''}`}>
            <li style={{ backgroundColor: isInWishlist ? 'green' : '' }}><AiOutlineHeart className='li-icon' /></li>
        </div> */}
       


            <img className='main-product-image' src={pic} alt='product image'/>
            <div className='product-overlay-icon'>
            <li><AiOutlineHeart className='heart-icon' /></li>
        </div>
        </div>
        <div className='product-details'>
            <h2 className='product-name'>{productname}</h2>
            <h4 className='product-price-quantity'>Price:₹38(500ml)</h4>
            <div className='buttons'>
                <button className='Product-subscribe-btn'  >Subscribe</button>
                <button className='product-add-to-cart-btn' >Add to Cart</button>                           
            </div>

            <div className='product-other-quantity-images'>
                {image.map((imageUrl, index) => (
                <div key={index}>
                    <img  className='Similar-product-images' src={imageUrl} alt={`product image ${index + 1}`} />
                        <p>250ml{quantity}</p>
                </div>
                ))}
            </div>
        </div>
    </div>
    <div className='About-product'>
        <h2 className='About-product-heading'>About Product</h2>
        <div className='About-product-description-box'>
            <ul className='About-product-description-list'>
                <li  className='About-product-description'>Description : Mother Dairy Livelite Double Toned Low Fat Milk 180 ml (ESL pouch) Milk is the most common dairy product that is used every day by almost everyone. Consume directly or add to your breakfast cereal, daily tea/coffee, milkshake and smoothies or other baked goods, desserts and puddings.</li>
                <li  className='About-product-description'>Country of Origin : India</li>
                <li  className='About-product-description'>Shelf Life : 90 days</li>
                <li  className='About-product-description'>Manufacturer Name : Heritage Foods Limited</li>
                <li  className='About-product-description'>Manufacturer Address : Heritage Foods Ltd, 6-3-541/C, Panjagutta, Hyderabad-82</li>
            </ul>
        </div>
    </div>

    <div className='Similar-products'>
        <h2 className='related-products-heading'>Related Products</h2>
        <div className='similar-products-carousel'>
          
        <div className='image-slider'>
            {images.map((image, index) => (
                <div key={index} className='image-slide'>
                    <img className='block' src={image} alt={`product image ${index + 1}`} />
                </div>
            ))}
        </div>

          
        </div>
    </div>

    </>
  )
}

export default SingleProduct

// import React, { useState, useEffect } from 'react';
// import Nav from '../Components/Nav';
// import './Trail.css';
// import pic from '../Images/Dummy/Heritage_Milk_1.png';
// import pic1 from '../Images/Dummy/Heritage_Milk_2.jpg';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';

// const Trail = () => {

//   const [startIndex, setStartIndex] = useState(0);
//   const images = [pic, pic1, pic, pic, pic1, pic, pic1, pic, pic1, pic];

//   useEffect(() => {
//     // This effect will run whenever the value of startIndex changes
//     // You can perform any side effects or data fetching here
//   }, [startIndex]); // Empty dependency array means this effect will run once after the initial render

//   const [productname, setProductname] = useState('');
//   const [quantity, setQuantity] = useState('');

//   const handleIndexChange = (index) => {
//     setStartIndex(index);
//   };

//   return (
//     <>
//       <Nav />

//       <div className='product-display'>
//         <div className='product-image'>
//           <img className='main-product-image' src={pic} alt='product image' />
//         </div>
//         <div className='product-details'>
//           <h2 className='product-name'>{productname}Heritage Daily Health Toned Milk</h2>

//           <div className='buttons'>
//             <button className='Product-subscribe-btn'>Subscribe</button>
//             <button className='product-add to cart-btn'>Add to Cart</button>
//           </div>

//           <div className='product-other-quantity-images'>
//             {images.map((imageUrl, index) => (
//               <div key={index}>
//                 <img className='Similar-product-images' src={imageUrl} alt={`product image ${index + 1}`} />
//                 <p>250ml{quantity}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className='About-product'>
//         <h2>About Product</h2>
//       </div>

//       <div className='Similar-products'>
//         <h2>Similar Products</h2>
//         <div className='similar-products-carousel'>
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={10}
//             pagination={{ clickable: true }}
//             onSlideChange={(swiper) => handleIndexChange(swiper.activeIndex)}
//           >
//             {images.map((image, index) => (
//               <SwiperSlide key={index} className='image-slide'>
//                 <img className='block' src={image} alt={`product image ${index + 1}`} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Trail;

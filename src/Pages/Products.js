import React, { useState } from 'react'
import Nav from '../Components/Nav';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from '../Pages/ProductDetail';
import '../Css/Products.css';

const Products = ({detail, view, close, setClose, addtocart}) => {

    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);

    const [product,setProduct]=useState(Productdetail);


   
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
        navigate('/cart'); // Assuming your cart route is '/cart'
      };



  return (
    <>
    <Nav/>
    <div className='products'>
    <h2># Products</h2>
    <p>Home . products</p>
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
            <div className='contant'>
                {
                    product.map((curElm) => 
                    {
                        return(
                            <>
                                <div className='box' key={curElm.id}>
                                    <div className='img_box'>
                                      <img src={curElm.Img} alt={curElm.Title}></img>
                                      <div className='icon'>
                                        
                                        <li><AiOutlineHeart className='li-icon' /></li>                                     
                                      </div>
                                    </div>
                                    <div className='detail'>
                                      <p>{curElm.Cat}</p>
                                      <h3>{curElm.Title}</h3>
                                      <h4>${curElm.Price}</h4>
                                      <button onClick={() => buyOnce(curElm)}>buy once</button>

                                            
                                      <button>subscribe</button>
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
    </>
    
  )
}

export default Products
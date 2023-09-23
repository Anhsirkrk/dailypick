import { useState } from 'react';
import React from 'react';
import '../Css/Home2.css';
import banner from '../Images/Home/Rectangle 1403.png';
import HorizontalScroll from "react-horizontal-scrolling";


const Home2 = () => {

  

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
        <div className='top-bar'>
            <div className='logo'>Logo</div>
            <div className="Location">
                <svg className="material-symbols-location-on-outline"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3334 12.6194C12.879 12.6194 13.3463 12.4249 13.7351 12.036C14.1234 11.6478 14.3175 11.1809 14.3175 10.6352C14.3175 10.0896 14.1234 9.62234 13.7351 9.23345C13.3463 8.84522 12.879 8.65111 12.3334 8.65111C11.7877 8.65111 11.3208 8.84522 10.9326 9.23345C10.5437 9.62234 10.3492 10.0896 10.3492 10.6352C10.3492 11.1809 10.5437 11.6478 10.9326 12.036C11.3208 12.4249 11.7877 12.6194 12.3334 12.6194ZM12.3334 19.911C14.3506 18.0592 15.8469 16.3766 16.8224 14.8634C17.798 13.3508 18.2857 12.0076 18.2857 10.8337C18.2857 9.0314 17.711 7.55554 16.5615 6.40607C15.4127 5.25726 14.0033 4.68286 12.3334 4.68286C10.6634 4.68286 9.25366 5.25726 8.10419 6.40607C6.95538 7.55554 6.38098 9.0314 6.38098 10.8337C6.38098 12.0076 6.86874 13.3508 7.84427 14.8634C8.8198 16.3766 10.3162 18.0592 12.3334 19.911ZM12.3334 22.54C9.67132 20.2748 7.68323 18.1706 6.36907 16.2275C5.05426 14.285 4.39685 12.4871 4.39685 10.8337C4.39685 8.35349 5.1948 6.37763 6.7907 4.90607C8.38594 3.43451 10.2335 2.69873 12.3334 2.69873C14.4332 2.69873 16.2808 3.43451 17.876 4.90607C19.4719 6.37763 20.2699 8.35349 20.2699 10.8337C20.2699 12.4871 19.6128 14.285 18.2986 16.2275C16.9838 18.1706 14.9954 20.2748 12.3334 22.54Z"
                        fill="white"/>
                </svg>
                <div className="hyderabad">Hyderabad</div>
            </div>
            <div className="userdisplay" onClick={toggleDropdown}>
              Username
                  {isOpen && (
                      <div className="dropdown-content">
                        <a href="#">Profile</a>
                        <a href="#">Signout</a>
                      </div>
                  )}
            </div>
        </div>
        <div className='banner'>
            <img class="bannner-img" src={banner} alt='banner' />
        </div>

        <div className='Button-Fields'>
            <center>
            <div className="fields">
  	            <div className="field" >
                    <button className="btn">News-Paper</button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Milk </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Curd </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Eggs </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Vegetables </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn" >Breads </button>
  	            </div>
  	            <div className="field" >
    	    	    <button className="btn"  >Cookies </button>
  	            </div>
            </div>
            </center>
        </div>
        <div className='daily-needs'>     
            
  	            <div className="Heading" >Daily Needs </div>
  	            <div className="group" >
                <div className="scroll-container">
                <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Vegetables </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Milk </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >News Papers </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Curd </div>
      			        </div>
    		        </div>
                <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Vegetables </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Milk </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >News Papers </div>
      			        </div>
    		        </div>
    		        <div className="rectangle" >
      			        <div className="DN-field" >
        				      <img className="DN_Image" src="rectangle-14102.png" />
        				      <div className="name" >Curd </div>
      			        </div>
    		        </div>

                </div>
  	            </div>
            </div>
            <div className='Best-Sellers'>     
            
            <div className="Heading" >Best Sellers </div>
            <div className="group" >
            <div className="scroll-container">
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Milk </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Curd </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Cookies </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Eggs </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Milk </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Curd </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Cookies </div>
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="BS-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                      <div className="name" >Eggs </div>
                    </div>
              </div>
              </div>
            </div>
      </div>
      <div className='Brands'>     
            
            <div className="Heading" >Brands </div>
            <div className="group" >
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />  
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" /> 
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />  
                    </div>
              </div>
              <div className="rectangle" >
                    <div className="B-field" >
                      <img className="DN_Image" src="rectangle-14102.png" />
                    </div>
              </div>
            </div>
      </div>
       
    </>
  )
}

export default Home2
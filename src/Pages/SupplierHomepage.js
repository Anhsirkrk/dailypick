import React, { useState } from 'react'
import Nav from '../Components/Nav.js';
import '../Css/SupplierHomepage.css';
import SupplierHome from '../Components/SupplierHome.js'
import SupplierOrderHistory from '../Components/SupplierOrderHistory.js';
import SupplierTodayList from '../Components/SupplierTodayList.js';
import SupplierApproval from '../Components/SupplierApproval.js';
import SupplierAllOrders from '../Components/SupplierAllOrders.js';

const SupplierHomepage = () => {

  const [contentType, setContentType]=useState('SupplierHome');
  const [selectedOption, setSelectedOption] = useState('SupplierHome');
  const token = localStorage.getItem('token');
  console.log("from getdailyneed",token);
  //alert(token);
  const bearer = `bearer` + " " + token;
  const tokenStartIndex = 8; // Assuming the token starts after "bearer "
  const formattedBearer = `bearer`+ " "+ bearer.substring(tokenStartIndex, bearer.length - 1); // Remove the last character (quote)
  
  
  //alert(formattedBearer);
  console.log(formattedBearer);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent=()=>{
    switch (contentType) {
      case 'SupplierOrderHistory':
        return <SupplierOrderHistory />;
      case 'SupplierTodayList':
        return <SupplierTodayList />;
      case 'SupplierApproval':
        return <SupplierApproval />;
        case 'SupplierAllOrders':
        return <SupplierAllOrders />;
      default:
        return <SupplierHome />;
    }
  }

  return (
    <>
    <Nav/>
    <div className='supplier-page'>
      <div className='supplierpage-left-side'>
        <div className='Supplier-Options-list'>
          <div className={`Supplier-Options ${selectedOption === 'SupplierHome' ? 'Supplier-Optionsselected' : ''}`} onClick={() =>{handleOptionClick('SupplierHome'); setContentType('SupplierHome')}}>Home</div>
          <div className={`Supplier-Options ${selectedOption === 'SupplierApproval' ? 'Supplier-Optionsselected' : ''}`} onClick={() =>{handleOptionClick('SupplierApproval'); setContentType('SupplierApproval')}}>Approval Pending</div>
          <div className={`Supplier-Options ${selectedOption === 'SupplierTodayList' ? 'Supplier-Optionsselected' : ''}`} onClick={() =>{handleOptionClick('SupplierTodayList');  setContentType('SupplierTodayList')}}>Today List</div>
          <div className={`Supplier-Options ${selectedOption === 'SupplierOrderHistory' ? 'Supplier-Optionsselected' : ''}`} onClick={() =>{handleOptionClick('SupplierOrderHistory'); setContentType('SupplierOrderHistory')}}>History</div>
          <div className={`Supplier-Options ${selectedOption === 'SupplierAllOrders' ? 'Supplier-Optionsselected' : ''}`} onClick={() => {handleOptionClick('SupplierAllOrders'); setContentType('SupplierAllOrders')}}>All Orders</div>

        </div>
      </div>
      <div className='supplierpage-main-content'>
          {renderContent()} 
      </div>
    </div>  
    </>
  )
}

export default SupplierHomepage 
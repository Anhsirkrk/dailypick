import React, { useState } from 'react'
import Nav from '../Components/Nav.js';
import '../Css/SupplierHomepage.css';
import SupplierHome from '../Components/SupplierHome.js'
import SupplierOrderHistory from '../Components/SupplierOrderHistory.js';
import SupplierTodayList from '../Components/SupplierTodayList.js';
import SupplierApproval from '../Components/SupplierApproval.js';

const SupplierHomepage = () => {

  const [contentType, setContentType]=useState('SupplierHome');

  const renderContent=()=>{
    switch (contentType) {
      case 'SupplierOrderHistory':
        return <SupplierOrderHistory />;
      case 'SupplierTodayList':
        return <SupplierTodayList />;
      case 'SupplierApproval':
        return <SupplierApproval />;
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
          <div className='Supplier-Options' onClick={() => setContentType('SupplierHome')}>Home</div>
          <div className='Supplier-Options' onClick={() => setContentType('SupplierApproval')}>Approval Pending</div>
          <div className='Supplier-Options' onClick={() => setContentType('SupplierOrderHistory')}>History</div>
          <div className='Supplier-Options' onClick={() => setContentType('SupplierTodayList')}>Today List</div>
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
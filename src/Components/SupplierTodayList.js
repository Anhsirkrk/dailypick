
import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import axios from 'axios';

const SupplierTodayList = () => {
  const today = new Date();
  const [ordersdata, setOrdersdata] = useState([]);
const [supplierId,setSupplierId]= useState('1');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filtereddata,setFilteredData]=useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); // Default to descending


  useEffect(() => {
    gettingOrderDetails();
      }, []);

      useEffect(() => {

     
      
        // Update the state with filtered orders
        //setFilteredData(filteredOrders);
      }, []); // Empty dependency array ensures that this effect runs once after the initial render
      

  const gettingOrderDetails = async () => {
    const supplierId = 1;
    const url = `https://localhost:7041/api/Supplier/GetSupplierOrderDetailsBySupplierId?supplierId=${supplierId}`;
    try {
      const response = await axios.get(url);
      console.log(response.data)
      if (response.status === 200) {
        setOrdersdata(response.data);
        const filteredOrders = response.data.filter(order => {
          const startDate = new Date(order.startDate);
          return startDate.toDateString() === today.toDateString();
        });
        setFilteredData(filteredOrders);
        
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  }

  const handleStatusChangetodaylist = (e) => {
    const selectedvalue = e.target.value;
    setSelectedStatus(selectedvalue);
    if (selectedvalue === "") {
      setFilteredData(ordersdata.filter(order => {
        const startDate = new Date(order.startDate);
        return startDate.toDateString() === today.toDateString();
      }));
    } else {
      const currentDate = new Date();
      console.log('Current Date:', currentDate);
  
      const statusfilteredOrders = ordersdata.filter(order => {
        const startDate = new Date(order.startDate);
        console.log('Order Start Date:', startDate);
  
        return selectedvalue === "" || order.orderStatus === selectedvalue;
      });
      console.log('statusfilteredOrders',statusfilteredOrders);
      const filtereddata= statusfilteredOrders.filter(order => {
        const startDate = new Date(order.startDate);
        return startDate.toDateString() === today.toDateString();
      });
      console.log('Filtered Orders:', filtereddata);
  
      setFilteredData(filtereddata);
    }
  };
  
  // .filter(order => {
  //   const startDate = new Date(order.startDate);
  //   console.log('Filtered Start Date:', startDate);

  //   return startDate.toDateString() === currentDate.toDateString();
  // });

 


const toggleSortDirection = () => {
  setSortDirection(prevDirection => prevDirection === 'desc' ? 'asc' : 'desc');
}
const handleSort = () => {
  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  setFilteredData(filtereddata.slice().sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  }));
};

const formatDate = (dateString) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};



  return (
    <div>
      <h4 className='orderhistory-heading'>Today Lists</h4>
      <div>
      <label htmlFor="orderStatus">Filter by Status:</label>
        <select
          id="orderStatus"
          name="orderStatus"
          value={selectedStatus}
          onChange={handleStatusChangetodaylist}
        >
          <option value="">All</option>
          <option value="Delivered">Delivered</option>
          <option value="To be Delivered">To be Delivered</option>
          <option value="Approval Pending from Supplier">Approval Pending from Supplier</option>
          <option value="Scheduled Changed">Scheduled Changed</option>
          <option value="User Not AVailable">User Not AVailable</option>
          <option value="Cancelled By User">Cancelled By User</option>
          <option value="Rejected By Supplier">Rejected By Supplier</option>
        </select>
      </div>
      <Table className='Supplier-order-table'>
        <thead>
          <tr className='table-header'>
            <th>Order Ref No</th>
            <th>Items</th>
            <th>Subscription Type</th>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>
            Start Date {sortDirection === 'asc' ? '▲' : '▼'}
            </th>
            <th>End Date</th>
            <th>Address</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtereddata.map(order => (
            <tr key={order.orderID}>
              <td>{order.orderID}</td>
              <td>{order.productName}</td>
              <td>{order.subscriptionTypes}</td>
              <td>{formatDate(order.startDate)}</td>
              <td>{formatDate(order.endDate)}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.name}</td>
              <td>{order.contactNo}</td>
              <td>{order.amount}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default SupplierTodayList;



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
      
      

  const gettingOrderDetails = async () => {
    const supplierId = 1;
    const url = `https://localhost:7041/api/Supplier/GetSupplierOrderDetailsBySupplierId?supplierId=${supplierId}`;
    try {
      const response = await axios.get(url);
      console.log(response.data)
      if (response.status === 200) {
        setOrdersdata(response.data);
        const filteredOrders = response.data.filter(order => {
          const startdate = new Date(order.startDate);
          const enddate = new Date(order.endDate);
          return startdate <= today && enddate >= today

        });
        setFilteredData(filteredOrders);
        console.log(filteredOrders);
        
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
        const startdate = new Date(order.startDate);
        const enddate = new Date(order.endDate);
        return startdate <= today && enddate >= today
      }));
    } 
    else
     {
      const statusfilteredOrdersbyselectedvalue = ordersdata.filter(order => {
        return selectedvalue === "" || order.orderStatus === selectedvalue;
      });
      const finalfiltereddatabydate = statusfilteredOrdersbyselectedvalue.filter(order => {
        const startdate = new Date(order.startDate);
        const enddate = new Date(order.endDate);
        return startdate <= today && enddate >= today
      });
      setFilteredData(finalfiltereddatabydate);
    }
  };
  

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
      <h4 className='orderhistory-heading'>Today Listss</h4>
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
          <option value="User Not AVailable">User Not Available</option>
          <option value="Cancelled By User">Cancelled By User</option>
          <option value="Rejected By Supplier">Rejected By Supplier</option>
          <option value="Rejected By Supplier">Failed to Delivery</option>
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


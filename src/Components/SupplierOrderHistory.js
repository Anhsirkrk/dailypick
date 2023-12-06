
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import {FiSearch}  from 'react-icons/fi';
import '../Css/SupplierOrderHistory.css';


const SupplierOrderHistory = () => {
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
        
        const filteredOrders = response.data.filter(order => {
          return order.orderStatus === "Delivered" || order.orderStatus==="Rejected By Supplier" || order.orderStatus==="Cancelled By User";
        });
        setOrdersdata(filteredOrders);
        setFilteredData(filteredOrders);
        
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  }

  const handleStatusChange = (e) => {
    const selectedvalue = e.target.value;
    setSelectedStatus(selectedvalue);
    alert(selectedvalue);
    if (selectedvalue === "") {
      alert("if hitted");
      const finalfilterdata = ordersdata.filter(order => {
        return order.orderStatus === "Delivered" || order.orderStatus==="Rejected By Supplier" || order.orderStatus==="Cancelled By User";        
    });
    setFilteredData(finalfilterdata);
  }
    else {
      alert("else hitted");
      
      const finalfilterdata = ordersdata.filter(order => {  
        return order.orderStatus === selectedvalue;
      });
      console.log('statusfilteredOrders',finalfilterdata);
      setFilteredData(finalfilterdata);
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
    <h4 className='orderhistory-heading'>Orders History</h4>
    <div className='Supplierorderhistory-headingandfilterdiv'>
      

      <div className='navsearchinput-container'>
      <input type='text' class='navsearchinput' placeholder='Search Order Id'></input>
      <div className='navsearchicon'><FiSearch style={{color:'var(--Gry, #7D7D7D)'}}/></div>
      </div>
 </div>
      <div>
      <label htmlFor="orderStatus">Filter by Status:</label>
        <select
          id="filterorderStatus"
          name="orderStatus"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="Delivered">Delivered</option>
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

export default SupplierOrderHistory;


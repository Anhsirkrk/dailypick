import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';

const SupplierOrderHistory = () => {

  
const[table,setTable]=useState([]);


const supplierId=1;
const orderhistorys = [
  {
    orderRefNo: 1,
    items: 'Milk',
    address: 'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno: '7780586000',
    subscriptiontype: 'Month',
    amount: '₹ 650',
    startdate: '2023-11-01',
    enddate: '2023-11-30',
    status: 'Completed',
  },
  {
    orderRefNo: 2,
    items: 'Milk',
    address: 'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno: '7780586000',
    subscriptiontype: 'Week',
    amount: '₹ 650',
    startdate: '2023-11-01',
    enddate: '2023-11-07',
    status: 'Completed',
  },
  {
    orderRefNo: 3,
    items: 'Milk',
    address: 'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno: '7780586000',
    subscriptiontype: 'One time',
    amount: '₹ 650',
    startdate: '2023-11-01',
    enddate: '2023-11-01',
    status: 'Completed',
  },
  {
    orderRefNo: 4,
    items: 'Milk',
    address: 'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno: '7780586000',
    subscriptiontype: 'Month',
    amount: '₹ 650',
    startdate: '2023-11-01',
    enddate: '2023-11-30',
    status: 'Pending',
  },
  {
    orderRefNo: 5,
    items: 'Milk',
    address: 'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno: '7780586000',
    subscriptiontype: 'Week',
    amount: '₹ 650',
    startdate: '2023-11-01',
    enddate: '2023-11-07',
    status: 'Pending',
  },
  {
    orderRefNo: 6,
    items: 'Milk',
    address: 'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno: '7780586000',
    subscriptiontype: 'One time',
    amount: '₹ 650',
    startdate: '2023-11-01',
    enddate: '2023-11-01',
    status: 'Pending',
  },
];


const GetOrderDetails = async () => {
  
    try {
    
const url = `https://localhost:7041/api/Supplier/GetSupplierOrderDetailsBySupplierId?supplierId=${supplierId}`;

      const response = await axios.post(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        alert('axioos done');
        console.log( response);
    
    } 
    catch (error)
     {
      console.error(error);
    }
};





useEffect(() => {
  const currentDate = '2023-11-02';
  const filteredOrders = orderhistory.filter(order => {
    const endDate = order.enddate;

    // Compare the current date with start and end dates
    return endDate >= currentDate;
  });

  // Update the state with filtered orders
  setTable(filteredOrders);
}, []); // Empty dependency array ensures that this effect runs once after the initial render





  return (
    <div>
<h4 className='orderhistory-heading'>History</h4>
      <Table className='Supplier-order-table'>
        <thead>
          <tr className='table-header'>
            <td>Order Ref No</td>
            <td>Items</td>
            <td>Address</td>
            <td>Name</td>
            <td>Contact No</td>
            <td>Subscription Type</td>
            <td>Amount</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
        {table.map(order => (
            <tr key={order.orderRefNo}>
              <td>{order.orderRefNo}</td>
              <td>{order.items}</td>
              <td>{order.address}</td>
              <td>{order.name}</td>
              <td>{order.contactno}</td>
              <td>{order.subscriptiontype}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default SupplierOrderHistory
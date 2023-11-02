
import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import axios from 'axios';

const SupplierOrderHistory = () => {
  const today = new Date();
  const [ordersdata, setOrdersdata] = useState([]);


  useEffect(() => {
    gettingOrderHistory();
  }, []);

  const gettingOrderHistory = async () => {
    alert("hitted");
    const supplierId = 1;
    const url = `https://localhost:7041/api/Supplier/GetSupplierOrderDetailsBySupplierId?supplierId=${supplierId}`;
    try {
      const response = await axios.get(url);
      
      if (response.status === 200) {
        setOrdersdata(response.data);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  }

  console.log(ordersdata);

  const filteredOrders = ordersdata.filter(order => {
    const startDate = new Date(order.startDate);
    return startDate > today;
  });

  
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
            <th>Order Ref No</th>
            <th>Items</th>
            <th>Address</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Subscription Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.orderID}>
              <td>{order.orderID}</td>
              <td>{order.productName}</td>
              <td>{order.deliveryAddress}</td>

              <td>{order.name}</td>
              <td>{order.contactNo}</td>
              <td>{order.subscriptionTypes}</td>
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

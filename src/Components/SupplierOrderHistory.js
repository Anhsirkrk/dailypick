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

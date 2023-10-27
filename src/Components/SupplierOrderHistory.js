import React from 'react';
import { Table } from 'react-bootstrap';

const SupplierOrderHistory = () => {

  const orderhistory =
[
    {
        orderRefNo:1,
        items: 'Milk',
        address:'Vishnu Priya Apartments, Flat no:101. Kothaguda',
        name: 'M.Srinivas',
        contactno:'7780586000',
        subscriptiontype:'One time',
        amount:'₹ 650',
        status:'Completed'
    },
    {
      orderRefNo:2,
      items: 'Milk',
      address:'Vishnu Priya Apartments, Flat no:101. Kothaguda',
      name: 'M.Srinivas',
      contactno:'7780586000', 
      subscriptiontype:'One time',
      amount:'₹ 650',
      status:'Completed'
  },
  {
    orderRefNo:3,
    items: 'Milk',
    address:'Vishnu Priya Apartments, Flat no:101. Kothaguda',
    name: 'M.Srinivas',
    contactno:'7780586000',
    subscriptiontype:'One time',
    amount:'₹ 650',
    status:'Completed'
},
    
]

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
        {orderhistory.map(order => (
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
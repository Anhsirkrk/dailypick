import React, { useState,useEffect } from 'react';
import  Table  from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import '../Css/SupplierApproval.css';
import { MdCurrencyRupee } from "react-icons/md";
import axios from 'axios';
import pic from '../Images/Dummy/Heritage_Milk_1.png';

const SupplierApproval = () => {

 const [filtereddata,setFilteredData]=useState([]);


 const[orderID,setOrderID]=useState('');
 const[supplierId,setSupplierId]=useState('');
 const[productName,setProductName]=useState('');
 const[imageUrl,setImageUrl]=useState('');
 const[deliveryAddress,setDeliveryAddress]=useState('');
 const[name,setName]=useState('');
 const[contactNo,setContactNo]=useState('');
 const[subscriptionTypes,setSubscriptionTypes]=useState('');
 const[amount,setAmount]=useState('');
 const[startDate,setStartDate]=useState('');
 const[endDate,setEndDate]=useState('');
 const[paymentStatus,setPaymentStatus]=useState('');
 const[orderStatus,setOrderStatus]=useState('');



useEffect(()=>{
  GetApprovalPendingList();
},[])


const GetApprovalPendingList = async () => {
  const supplierId = 1;
  const url = `https://localhost:7041/api/Supplier/GetSupplierOrderDetailsBySupplierId?supplierId=${supplierId}`;
  try {
    const response = await axios.get(url);
    console.log(response.data)
    if (response.status === 200) {
      
      const filteredOrders = response.data.filter(order => {
        return order.orderStatus === 'Approval Pending from Supplier';
      });
      setFilteredData(filteredOrders);
      
    }
  } catch (error) {
    console.error("Error fetching order history:", error);
  }
}



const UpdateApprovalPendingList=async(orderID,orderStatus)=>{
  const supplierId = 1;
try{
  const response = await axios.post('https://localhost:7041/api/Supplier/UpdatetheOrderStatusBySupplier',
    
      {
        SupplierId: supplierId,
        orderStatus: orderStatus,
        orderIds: orderID
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  );
  
}
catch(error){
  console.log(error);
}
};


  return (
    <div>
      <div>
      <Table className='Supplier-Approval-Table'>
        <thead className='Supplier-Approval-Table-thead'>
          <tr>
            <th>Select</th>
            <th>Product</th>
            <th>OrderId</th>
            <th>Subscription Type</th>
            <th>Start Date</th>
            <th>End Date No</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
        
           {filtereddata.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td> 
                  <Card className='Supplier-product-card'>
                    <Card.Img className='Supplier-product-card-image' variant="top" src={`data:image/jpeg;base64,${order.imageUrl}`} alt={order.Title} />
                    <Card.Body className='Supplier-product-card-body'>
                      <Card.Title className='Supplier-product-card-title'><h4 className='Supplier-product-title'>{order.Title}</h4><h4 className='Supplier-product-title'><MdCurrencyRupee />{order.amount}</h4></Card.Title>
                    </Card.Body>
                  </Card>
              </td>
              <td>{order.orderID}</td>
              <td>{order.subscriptionTypes}</td>
              <td>{order.startDate}</td>
              <td>{order.endDate}</td>
              <td className='Supplier-Button-Field'>
                <button className='Supplier-Approval-Button' type='button' onClick={()=>UpdateApprovalPendingList(order.orderID, "To be Delivered")}>Approve</button>
                <button className='Supplier-Reject-Button' type='button' onClick={()=>UpdateApprovalPendingList(order.orderID,"Rejected By Supplier")}>Reject</button>
              </td>
            </tr>
          ))} 
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default SupplierApproval

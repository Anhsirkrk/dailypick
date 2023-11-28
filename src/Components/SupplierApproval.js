import React, { useState,useEffect } from 'react';
import  Table  from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import '../Css/SupplierApproval.css';
import { MdCurrencyRupee } from "react-icons/md";
import axios from 'axios';
import pic from '../Images/Dummy/Heritage_Milk_1.png';

const SupplierApproval = () => {

 const [filteredlist,setFilteredlist]=useState([]);

const filtereddata=[
  {
    id:1,
    Title:"Amul Milk Gold",
    Cat: 'Milk',
    Price: '723',
    Img: './Images/Amul/Amul_Milk_1.png'
},
{
    id:2,
    Title:"Amul Milk Blue",
    Cat: 'Milk',
    Price: '168',
    Img: './Images/Amul/Amul_Milk_2.jpg'
},
{
    id:3,
    Title:"Amul Milk Packet",
    Cat: 'Milk',
    Price: '49',
    Img: './Images/Amul/Amul_Milk_3.jpg'
},
{
    id:4,
    Title:"Heritage Toned Milk",
    Cat: 'Milk',
    Price: '1049',
    Img: './Images/Heritage/Heritage_Milk_1.png'
},
{
    id:5,
    Title:"Heritage Double Toned Milk",
    Cat: 'Milk',
    Price: '49',
    Img: './Images/Heritage/Heritage_Milk_2.jpg'
},
{
    id:6,
    Title:"Hutsun Milk Dairy Whitener",
    Cat: 'Milk',
    Price: '156',
    Img: './Images/Hustun/Hutsun_milk_1.webp'
},
{
    id:7,
    Title:"Amul Cow Ghee Glass Bottle",
    Cat: 'Ghee',
    Price: '2098',
    Img: './Images/Amul/Amul_Cow_Ghee.jpg'
},
{
    id:8,
    Title:"Heritage Cow Ghee packet",
    Cat: 'Ghee',
    Price: '386',
    Img: './Images/Heritage/heritage_cow_ghee.jpg'
},
{
    id:9,
    Title:"Hutsun Ghee Bottle pack",
    Cat: 'Ghee',
    Price: '693',
    Img: './Images/Hustun/Hatsun_Ghee.jpg'
},
{
    id:10,
    Title:"Heritage Total Curd",
    Cat: 'Curd',
    Price: '536',
    Img: './Images/Heritage/Heritage_Curd_1.jpg'
},
{
    id:11,
    Title:"Hutsun Premium Curd",
    Cat: 'Curd',
    Price: '198',
    Img: './Images/Heritage/Heritage_Curd_2.webp'
},

{
    id:12,
    Title:"Heritage Curd",
    Cat: 'Curd',
    Price: '793',
    Img: './Images/Hustun/Hutsun_Curd_2.webp'
},
{
    id:13,
    Title:"Apples",
    Cat: 'Apple',
    Price: '793',
    Img: './Images/Fruits/Apples/Apples.webp'
},
{
    id:14,
    Title:"Banana",
    Cat: 'Banana',
    Price: '793',
    Img: './Images/Fruits/Banana.jpg'
},
{
    id:15,
    Title:"Pineapple",
    Cat: 'Pineapple',
    Price: '793',
    Img: './Images/Fruits/Pineapple.jpg'
},
{
    id:16,
    Title:"Promogranate",
    Cat: 'Promogranate',
    Price: '793',
    Img: './Images/Fruits/Promogranate.png'
},
];
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
      setFilteredlist(filteredOrders);
      
    }
  } catch (error) {
    console.error("Error fetching order history:", error);
  }
}



const UpdateApprovalPendingList=async()=>{
try{
  const response = await axios.get('https://localhost:7041/api/Supplier/UpdatetheOrderStatusBySupplier',
    {
      params: {
        supplierId: 0,
        orderStatus: "string",
        orderIds: 0
      },
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
      },
    }
  );
}
catch(error){
  console.log(error);
}
}
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
                  {/* <Card.Img className='Supplier-product-card-image' variant="top" src={`data:image/jpeg;base64,${order.Img}`} alt={order.Title} /> */}
                    <Card.Img className='Supplier-product-card-image' variant="top" src={order.Img} alt={order.Title} />
                    <Card.Body className='Supplier-product-card-body'>
                      <Card.Title className='Supplier-product-card-title'><h4 className='Supplier-product-title'>{order.Title}</h4><h4 className='Supplier-product-title'><MdCurrencyRupee />{order.Price}</h4></Card.Title>
                    </Card.Body>
                  </Card>
              </td>
              <td>{order.date}</td>
            </tr>
          ))} 
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default SupplierApproval

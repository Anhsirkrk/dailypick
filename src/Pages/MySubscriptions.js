import React, { useEffect, useState } from 'react'

const MySubscriptions = () => {

  const [orderProductId,setorderProductId] = useState('');
  const [orderProductIndiviudalprice,setorderProductIndiviudalprice] = useState('');
  const [orderProductquanity,setorderProductquanity] = useState('');
  const [orderProductSUbscriptiontype,setorderProductSUbscriptiontype] = useState('');
  const [orderProductStartdate,setorderProductStartdate] = useState('');
  const [orderProductEnddate,setorderProductEnddate] = useState('');
  const [orderProductSize,setorderProductSize] = useState('');
  const [orderProducttimeslot,setorderProducttimeslot] = useState('');
  const [orderProductTotalAmounttobePaid,setorderProductTotalAmounttobePaid] = useState('');
  const [orderProductAddress,setorderProductAddress]=useState([]);
  const [orderProductAddressId,setorderProductAddressId]=useState('');
  
  useEffect(()=>{ 
    const orderProductId = localStorage.getItem('order-selectedproductId');
    const orderProductIndiviudalprice = localStorage.getItem('order-productindividualprice');
    const orderProductquanity = localStorage.getItem('order-quantityofproduct');
    const orderProductSUbscriptiontype = localStorage.getItem('order-selectedsubscriptiontype');
    const orderProductStartdate = localStorage.getItem('order-selectedStartdate');
    const orderProductEnddate = localStorage.getItem('order-selectedEnddate');
    const orderProductSize = localStorage.getItem('order-selectedSizeofproduct');
    const orderProducttimeslot = localStorage.getItem('order-selectedtimeslot');
    const orderProductTotalAmounttobePaid = localStorage.getItem('order-TotalAmounttobePaid');
    const orderProductAddressString = localStorage.getItem('order-SelectedAddressforSubscription');
    const orderProductAddress = JSON.parse(orderProductAddressString);    
    const orderProductAddressId = localStorage.getItem('order-SelectedAddressIDforSubscription');
    setorderProductId(orderProductId);
    setorderProductIndiviudalprice(orderProductIndiviudalprice);
    setorderProductquanity(orderProductquanity);
    setorderProductSUbscriptiontype(orderProductSUbscriptiontype);
    setorderProductStartdate(orderProductStartdate);
    setorderProductEnddate(orderProductEnddate);
    setorderProductSize(orderProductSize);
    setorderProducttimeslot(orderProducttimeslot);
    setorderProductTotalAmounttobePaid(orderProductTotalAmounttobePaid);
    setorderProductAddress(orderProductAddress);
    setorderProductAddressId(orderProductAddressId);
  },[]);

  console.log(`orderProductId`,{orderProductId});
  console.log(`orderProductIndiviudalprice`,{orderProductIndiviudalprice});
  console.log(`orderProductquanity`,{orderProductquanity});
  console.log(`orderProductSUbscriptiontype`,{orderProductSUbscriptiontype});
  console.log(`orderProductStartdate`,{orderProductStartdate});
  console.log(`orderProductEnddate`,{orderProductEnddate});
  console.log(`orderProductSize`,{orderProductSize});
  console.log(`orderProducttimeslot`,{orderProducttimeslot});
  console.log(`orderProductTotalAmounttobePaid`,{orderProductTotalAmounttobePaid});
  console.log(`orderProductAddress`,{orderProductAddress});
  console.log(`orderProductAddressId`,{orderProductAddressId});
  
  return (
    <div>MySubscriptions</div>
  )
}

export default MySubscriptions
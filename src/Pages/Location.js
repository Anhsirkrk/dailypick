import React,{useState,useEffect,useRef } from 'react';
import Nav from '../Components/Nav';
import MapComponent  from '../Components/MapComponent';
import { Button } from 'react-bootstrap';
import { Form, Alert } from "react-bootstrap";
import Geocode from 'react-geocode';
import {FiSearch}  from 'react-icons/fi';
import {TbCurrentLocation} from 'react-icons/tb';
import {BiCircle} from 'react-icons/bi';
import '../Css/Location.css';
import validation from '../Components/validations';
import axios from 'axios';
import {ToastContainer,toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { Country, State, City }  from 'country-state-city';
import { AiOutlineLine } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const Location = () => {

  const [userid,setUserId]=useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [supplierdata,setSupplierData]=useState([]);


  const [address, setAddress] = useState('');
  const [savedAddresses,setSavedAddresses]= useState([]);
  const [selectedAddressPinCode,setSelectedAddressPincode]= useState('');

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [personnameofAddress,setpersonNameOfAddress]= useState('');
  const [mobilenumofAddress,setMobileNumOfAddress]=useState('');
  const [pincode,setPinCode]=useState('');
  const [locality,setLocality]=useState('');
  const [houseNo,setHouseNo]=useState('');
  // const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedstate,setSelectedState] = useState('');
  const [selectedStateISCode, setSelectedStateIsCode] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [addresslbl, setAddresslbl] = useState('');


  const [filteredSuppliers,setFilteredSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [validationerrors,setValidationErrors]=useState({});
    const [resultMessage, setResultMessage] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // const countries = Country.getAllCountries();
    const states = State.getStatesOfCountry('IN') ;
    const cities = selectedStateISCode ? City.getCitiesOfState('IN',selectedStateISCode) : [];

    const [orderOrderId,setOrderOrderId] = useState('');
    const [orderProductId,setorderProductId] = useState('');
    const [orderProductIndiviudalprice,setorderProductIndiviudalprice] = useState('');
    const [orderProductquanity,setorderProductquanity] = useState('');
    const [orderProductSUbscriptiontype,setorderProductSUbscriptiontype] = useState('');
    const [orderProductStartdate,setorderProductStartdate] = useState('');
    const [orderProductEnddate,setorderProductEnddate] = useState('');
    const [orderProductSize,setorderProductSize] = useState('');
    const [orderProducttimeslot,setorderProducttimeslot] = useState('');
    const [orderProductTotalAmounttobePaid,setorderProductTotalAmounttobePaid] = useState('');
    const [orderselectedSupplierId, setorderSelectedSupplierId] = useState(null);
    const [orderPaymentId,setOrderpaymentId]= useState('');
    const [orderUserSubscriptionId,setorderUserSubscriptionId]=useState('');
    const [ orderpaymentstatus,setOrderpaymentStatus]= useState('');
    const [ orderpaymenttransactionid,setorderPaymenttransactionid]= useState('');
    const [selectedproduct,setselectedproduct] = useState([]);
    const [selectedprice,setselectedprice]= useState('');

    

    const location = useLocation();

    const totalamount = localStorage.getItem('order-TotalAmounttobePaid');
    console.log('total amount',totalamount);

    const currentDate = new Date(); // This will create a new Date object with the current date and time
const TodayDate = currentDate.toISOString().split('T')[0]; // This will format it as 'YYYY-MM-DD'


 console.log(orderProductStartdate);
 console.log(orderProductEnddate);
 console.log(TodayDate);

 const token = localStorage.getItem('token');
 console.log("from getdailyneed",token);
 //alert(token);
 const bearer = `bearer` + " " + token;
 const tokenStartIndex = 8; // Assuming the token starts after "bearer "
 const formattedBearer = `bearer`+ " "+ bearer.substring(tokenStartIndex, bearer.length - 1); // Remove the last character (quote)
 
 
 //alert(formattedBearer);
 console.log(formattedBearer);

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
        setorderProductId(orderProductId);
        setorderProductIndiviudalprice(orderProductIndiviudalprice);
        setorderProductquanity(orderProductquanity);
        setorderProductSUbscriptiontype(orderProductSUbscriptiontype);
        setorderProductStartdate(orderProductStartdate);
        setorderProductEnddate(orderProductEnddate);
        setorderProductSize(orderProductSize);
        setorderProducttimeslot(orderProducttimeslot);
        setorderProductTotalAmounttobePaid(orderProductTotalAmounttobePaid);
        gettingsupplierdata();
    },[]);

   

    const handleCountryChange = (event) => {
      const countryIsoCode = event.target.value;
      // setSelectedCountry(countryIsoCode);
      setSelectedStateIsCode('');
      setSelectedCity('');
    }

    const handleStateChange = (event) => {
      const stateIsoCode = event.target.value;
      const selectedStateObject = states.find(state => state.isoCode === stateIsoCode);
      if (selectedStateObject) {
        setSelectedStateIsCode(selectedStateObject.isoCode);
        setSelectedStateName(selectedStateObject.name); // Add this line to set the state name
      }
      setSelectedState(stateIsoCode);
      setSelectedCity('');
    }

    const handleCityChange = (event) => {
      const cityName = event.target.value;
      setSelectedCity(cityName);
    }

      
    

    useEffect(() => {
      // Get item from local storage on component mount
      const storeddata = localStorage.getItem('userdata');
      if (storeddata) {
      const storeduserdata = JSON.parse(storeddata);
      console.log('storeduseerdata',storeduserdata);
        setUserId(storeduserdata.userId);
      }
    }, []);
  
    useEffect(()=>{
      if (userid) {
        gettingSavedAddresses(); // Trigger fetching saved addresses when userid is updated
      }
    },[userid]);

    const gettingSavedAddresses= async()=>{
        // alert("getting saved addre hitted");
        const url=`https://localhost:7041/api/User/GetTheUserAdressDetails?userd=${userid}`;
        const data={
          userd:userid
        }
     // alert("address sending userid",userid);
        console.log(data);
        try{
         //alert("enetered to getting saved address axios");
          const response = await axios.get(url, {
            headers: {
              'Authorization': formattedBearer,
              'Content-Type': 'application/json',
              // Add other necessary headers
            },} );
          console.log(response.data);
          localStorage.setItem('usersavedaddress',JSON.stringify(response.data));
       //  alert("get address axios completed");
          if (response.status === 200) 
          {
            setSavedAddresses(response.data);
          }
          else
          {
            toast.error("getting address failed");
          }
      }
      catch(error)
      {
        alert("gett sav adr axios error catch");
      setResultMessage('An error occurred while processing your request.');
      console.error(error);
    }
  }

   
  useEffect(() => {
    if (locationData) {
      setLatitude(locationData.latitude);
      setLongitude(locationData.longitude);
    }
  }, [gettingSavedAddresses,setLocationData,locationData,setSelectedStateName,selectedStateName]);

  useEffect(() => {
    if (selectedAddressPinCode !== null) {
    setFilteredSuppliers(supplierdata.filter(supr => {
      return supr.pinCodesOfSupply.includes(selectedAddressPinCode.toString());
    }));
  }
  }, [selectedAddressPinCode]);

  const filetringsupplierdatabypincode = (e) =>{
    setSelectedAddressPincode(e);
    setFilteredSuppliers(supplierdata.filter(supr => {
     return supr.pinCodesOfSupply.includes(selectedAddressPinCode.toString());
   }));
   

   }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
         // alert("got cords");
          console.log('Current Coordinates:', latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSavedAddressClick = (addr) => {
        // setSelectedAddressId((prevId) => (prevId === id ? null : id));
        //alert('handleSavedAddressClick hitted');
       // alert(addr.addressId);
        setSelectedAddressId((prevId) => (prevId === addr.addressId ? null : addr.addressId));
        setSelectedAddressPincode((prevId)=>(prevId === addr.pincode ? null : addr.pincode));
        const settingAddressData = {
            addressId: addr.addressId,
            userId: addr.userId,
            country: addr.country,
            state: addr.state,
            city: addr.city,
            area: addr.area,
            pincode: addr.pincode,
            houseNo: addr.houseNo,
            longitude: addr.longitude,
            latitude: addr.latitude,
            username: addr.username,
            mobileNumber: addr.mobileNumber 
            };
        console.log(settingAddressData);
        const settingAddressDataString = JSON.stringify(settingAddressData);
        localStorage.setItem('order-SelectedAddressforSubscription',settingAddressDataString);
        localStorage.setItem('order-SelectedAddressPinCodeforSubscription',selectedAddressPinCode);
        localStorage.setItem('order-SelectedAddressIDforSubscription',selectedAddressId);

  };

  
  const handleSupplierClick = (supr) => {
    //alert('handleSupplier click hitted');
   // alert(supr.supplierId);
    setorderSelectedSupplierId((prevId) => (prevId === supr.supplierId ? null : supr.supplierId));
  };

  const handlenewaddresssubmitform= async (e)=>{
    e.preventDefault();
      if(latitude!="" && longitude!="")
    {
      if(orderselectedSupplierId!=null)
      {
        if(orderselectedSupplierId!=null)
        {
            e.preventDefault();
            //alert("add sub form hitted ");
            const values={personnameofAddress,mobilenumofAddress,pincode,locality,houseNo,selectedCity,selectedStateName,addresslbl};
            //alert("check console 243 for values");
            console.log(values);
          const validationErrors = validation(values,["personnameofAddress","mobilenumofAddress","pincode","locality","houseNo","selectedCity","selectedStateName","addresslbl"]);
          console.log(validationErrors);
        
          if(Object.keys(validationErrors).length>0)
          {
            console.log(validationErrors);
           // alert("validation err recieved");
            console.log(validationErrors);
            setValidationErrors(validationErrors);
            return;
          }
          try 
          {
           alert("entered to adding new address  axios");
            const url = 'https://localhost:7041/api/User/AddingAdressDetails';
            const data = {
              addressId: 0,
              userId:userid,
              country:"India",
              state:selectedStateName,
              city:selectedCity,
              area:locality,
              pincode:pincode,
              houseNo:houseNo,
              longitude:longitude,
              latitude:latitude,
              username:personnameofAddress,
              mobileNumber:mobilenumofAddress 
            };
            const Headers = {
              'Authorization': formattedBearer,
              'Content-Type': 'application/json',
              // Add other necessary headers
            };
            console.log(data);
            alert(formattedBearer);
           // alert('axios data ready');
            const response = await axios.post(url, data,{headers: Headers});
            console.log(response);
            alert("axios completed");
            if (response.status === 200) 
            {
             alert("axios 200");
              const seladdrid= response.data.addressId;
              setSelectedAddressId(response.data.addressId);
              const settingadressdata={
                addressId: response.data.addressId,
                userId:userid,
                country:"India",
                state:selectedStateName,
                city:selectedCity,
                area:locality,
                pincode:pincode,
                houseNo:houseNo,
                longitude:longitude,
                latitude:latitude,
                username:personnameofAddress,
                mobileNumber:mobilenumofAddress 
              }
              console.log(settingadressdata);
              localStorage.setItem('order-SelectedAddressforSubscription',settingadressdata);
              localStorage.setItem('order-SelectedAddressIDforSubscription',response.data.addressId);
              // setSelectedAddressId((prevId) => (prevId === response.data.addressId ? null : response.data.addressId));
              setSelectedAddressPincode((prevId)=>(prevId === pincode ? null : pincode));
                
              const setteddata = localStorage.getItem('order-SelectedAddressforSubscription');
                console.log(setteddata);
                createorderIdfororder(seladdrid,orderselectedSupplierId);
            
            } 
            else 
            {
              alert("axios not  200");
              setResultMessage("Address Not Added");
            }
          } 
          catch(error)
            {
              alert("axios error catch");
            setResultMessage('An error occurred while processing your request.');
            console.error(error);
          }
      }
      else
      {
        alert("select anyone of supplier");
        return
      }
    }
    else{
      alert("select sany one of supplier");
      return;
    }
  }
  else{
    alert("select loc from map");
      return;
  }
    
    
   }

   const handlecontinuetopaymentbysavedadress = ()=>{
    //alert(`selectedAddressId,${selectedAddressId}`);
    // alert('selectedAddresspincode',selectedAddressPinCode);
    //alert(`selectedsupplierid,${orderselectedSupplierId}`);
    if(selectedAddressId!= null)
    {
      if(orderselectedSupplierId!=null)
      {
       
        localStorage.setItem('order-SelectedAddressIDforSubscription',selectedAddressId);
        localStorage.setItem('order-SelectedAddressPincodeforSubscription',selectedAddressPinCode);
        localStorage.setItem('order-SelectedorderSupplierIdforSubscription',orderselectedSupplierId);
        createorderIdfororder(selectedAddressId,orderselectedSupplierId);
        
      }
      else
      {
        alert("select anyone of the supplier");
        return;
      }
      
    }
    else{
      alert("select address or add new address");
      return;
    }
     
  }

  const createorderIdfororder= async (selectedAddressId,orderselectedSupplierId)=>{
    if(userid!=null)
    {
      if(orderProductSUbscriptiontype!=null)
      {
            if(orderProductTotalAmounttobePaid!=null)
            {
              if(orderProductStartdate!=null && orderProductEnddate!=null)
              {
                
                if(orderProducttimeslot!=null && selectedAddressId!=null && orderselectedSupplierId!=null)
                {      
                          const url= "https://localhost:7041/api/Order/CreateOrder";

                          const adjustedStartDate = new Date(orderProductStartdate);
adjustedStartDate.setUTCHours(0, 0, 0, 0);
adjustedStartDate.setDate(adjustedStartDate.getDate() + 1); // Add one day

const adjustedEndDate = new Date(orderProductEnddate);
adjustedEndDate.setUTCHours(0, 0, 0, 0);
adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Add one day


                        const data ={
                          orderId:1,
                          userId:userid,
                          productId:orderProductId,
                          productPrice:orderProductIndiviudalprice,
                          quantity:orderProductquanity,
                          sizeOfProduct:orderProductSize,
                          subscriptionTypeId:orderProductSUbscriptiontype,
                          totalAmount:orderProductTotalAmounttobePaid,
                          orderDate: new Date(TodayDate).toISOString(),
                          startDate: new Date(adjustedStartDate).toISOString(),
                          endDate:new Date(adjustedEndDate).toISOString(),
                          orderPaymentStatus:'Pending',
                          timeSlot:orderProducttimeslot,
                          addressId:selectedAddressId,
                          supplierId:orderselectedSupplierId,  
                        }
                        console.log("createorderIdfororder:",data);
                        const Headers = {
                          'Authorization': formattedBearer,
                          'Content-Type': 'application/json',
                          // Add other necessary headers
                        };
                        try{
                          const response = await axios.post(url,data,{headers:Headers});
                        console.log(response.data);
                        alert("orderId axios completed");
                        if (response.status === 200) 
                        {
                          alert("axios 200");
                           alert(response.data.supplier.orderId);
                          setOrderOrderId(response.data.supplier.orderId);
                          console.log('orderId',response.data.supplier.orderId);  
                          localStorage.setItem('order-SelectedProductOrderId',response.data.supplier.orderId); 
                          const selProOrderIDsetteddata = JSON.parse(localStorage.getItem('order-SelectedProductOrderId'));
                          // alert("here1");
                          console.log('selProOrderIDsetteddata',selProOrderIDsetteddata);
                          // alert("here2");
                          //actually here  we have to redirect to payemnt page , but due to payejnt page unavailable we are directly inserting payment table form ehere
                          console.log('order-orderid',selProOrderIDsetteddata);
                          // alert(`order-order id:'${selProOrderIDsetteddata}`)
                          createpaymentIdandUserSubscrtiptionId(selProOrderIDsetteddata);
                        } 
                        else 
                        {
                           alert("orderid axios not  200");
                          setResultMessage("order Not created");
                        }

                        }
                        catch(error){
                          console.log(error);
                          alert("orderid catch axios not  200");
                          setResultMessage("order Not created");
                        }
                }
                else
                {
                  alert("timeslot or addressid or supplierId is null");
                  return;  
                }

            }
            else
            {
              alert("start date or end date null");
              return; 
            }
          } 
          else
          {
            alert("total amount deatils not found");
            return; 
          }
      }
      else
      {
        alert("please select susbcription ");
            return; 

      }
   }
  else
  {
      alert("user id not found");
      return;
    }
   }

   console.log(orderProducttimeslot);
                console.log(selectedAddressId);
                console.log(orderselectedSupplierId);
  
   const createpaymentIdandUserSubscrtiptionId = async(currentorderid)=>{
     alert(currentorderid);
    if(currentorderid)
    {
     try{
          const url="https://localhost:7041/api/Payment/UserPayment";
          const data = {
            paymentId:0,
            orderId:currentorderid,
            paymentMethod:'UPI',
            amount:orderProductTotalAmounttobePaid,
            transactionId:'abc24152',
          paymentstatus:'completed'
          }
          console.log(data);
          const Headers = {
            'Authorization': formattedBearer,
            'Content-Type': 'application/json',
            // Add other necessary headers
          };
          const response =await axios.post(url,data,{headers:Headers});
          console.log(response.data);

          console.log('order payment status', response.data.paymentStatus);
console.log('order payment status', response.data.transactionId);

          alert('insert payment axios completed');
          if(response.status===200)
          {
            alert(" userpayment response is 200")
            alert('paymentid :', response.data.paymentId );
            setOrderpaymentId(response.data.paymentId);
            console.log('ord pay id:', response.data.paymentId);
            alert('paymnt console  485 ');
            localStorage.setItem('order-SelectedProductPaymentId',response.data.paymentId);
            const orderpamentidsetteddata = localStorage.getItem('order-SelectedProductPaymentId');
              console.log(orderpamentidsetteddata);

            console.log('user susc id',response.data.userSubscriptionId);
            setorderUserSubscriptionId(response.data.userSubscriptionId);
            localStorage.setItem('order-SelectedProductUserSubscriptionId',response.data.userSubscriptionId);
            const orderusersusbcidsetteddata = localStorage.getItem('order-SelectedProductUserSubscriptionId');
              console.log('orderusersusbcidsetteddata',orderusersusbcidsetteddata);

              console.log('order payment status',response.data.paymentStatus);
              setOrderpaymentStatus(response.data.paymentStatus);
              localStorage.setItem('order-SelectedProductPaymentStatus',response.data.paymentStatus);
              const orderproductpaymentstatus = localStorage.getItem('order-SelectedProductPaymentStatus');
                console.log('orderproductpaymentstatus :',orderproductpaymentstatus);

                console.log('order payment status',response.data.transactionId
                );
              setorderPaymenttransactionid(response.data.transactionId);
              localStorage.setItem('order-SelectedProductPaymentTransactionId',response.data.transactionId);
              const orderproductpaymentTransactionId = localStorage.getItem('order-SelectedProductPaymentTransactionId');
                console.log('orderproductpaymentTransactionId :',orderproductpaymentTransactionId);

                createsupplierorderId(currentorderid,orderusersusbcidsetteddata);

          }
          else
          {
            alert('pay axios not 200');
            setResultMessage('paymnet id not generated');
          }
        }
          catch(err)
          {
            alert('error createpaymentIdandUserSubscrtiptionId   ');
            console.log(err);
          }
    }
    else
    {
      alert('ordr id not found');
      return;
    }

   }

   const createsupplierorderId =async (currentorderid,orderusersusbcidsetteddata)=>{
     alert('createsupplierorderId  hitted');
  try{

    if(orderusersusbcidsetteddata!=null)
    {
      const url="https://localhost:7041/api/Supplier/SupplierOrderCreation";
      const adjustedStartDate = new Date(orderProductStartdate);
      adjustedStartDate.setUTCHours(0, 0, 0, 0);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1); // Add one day
      
      const adjustedEndDate = new Date(orderProductEnddate);
      adjustedEndDate.setUTCHours(0, 0, 0, 0);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Add one day
      
      
       const data ={
        supplierId: orderselectedSupplierId,
        orderId:currentorderid,
        supplierOrderAmount:orderProductTotalAmounttobePaid * 0.95,
        orderDate: new Date(TodayDate).toISOString(),
        startDate: new Date(adjustedStartDate).toISOString(),
        endDate:new Date(adjustedEndDate).toISOString(),
        orderstatus:'Approval Pending from Supplier',
        orderPaymentStatus:'Not Recieved',
        orderDate: new Date(TodayDate).toISOString(),
        startDate: adjustedStartDate.toISOString(),
        endDate: adjustedEndDate.toISOString(),
        userId:0,
        productId:0,
        productPrice:0,
        quantity:0,
        sizeOfProduct:0,
        timeSlot:'0',
        addressId:'0',
        supplierOrderID:'0'
       }
       
       console.log("createsupplierorderId sendibg data :",data);
       const Headers = {
        'Authorization': formattedBearer,
        'Content-Type': 'application/json',
        // Add other necessary headers
      };
        const response = await axios.post(url,data,{headers:Headers});
        console.log(response.data);

        // alert('create supl order axios done');

        // alert('created supl order id',response.data.supplier.supplierOrderID);
        console.log('created supl id',response.data.supplier.supplierOrderID);
        localStorage.setItem('order-SelectedProductUserSupplierOrderId',response.data.supplier.supplierOrderID);
        const ordersupplierORderidsetteddata = JSON.parse(localStorage.getItem('order-SelectedProductUserSupplierOrderId'));
        console.log('ordersupplierORderidsetteddata',ordersupplierORderidsetteddata);

        navigate('/paymentstatus');
    }
    else
    {
      alert("user susbc id not generated check payent stauts ");
      setResultMessage("user susbc id not generated");
    }
  }
  catch(err){
    console.log(err);
  }
   }

  const handleToggleAddreessForm = () => {
    setShowForm(prevState => !prevState);
    setSelectedAddressId(null);
  }

  const validatemobile= async(mobilenumofAddress)=>{
    const values ={mobilenumofAddress}
    const validationErrors = validation(values,['mobilenumofAddress']);
    console.log(validationErrors.mobilenumofAddress);
    setValidationErrors((prevState) => ({
      ...prevState,
      mobilenumofAddress: validationErrors.mobilenumofAddress,
    }));
  }

  const validatePinCode= async(pincode)=>{
    const values ={pincode}
    const validationErrors = validation(values,['pincode']);
    console.log(validationErrors.pincode);
    setValidationErrors((prevState) => ({
      ...prevState,
      pincode: validationErrors.pincode,
    }));
  }

  const handleAddressLbl = (label) => {
    setAddresslbl(label);
  };


  const gettingsupplierdata =async ()=>{
   // alert("get sup hitted");
    const url="https://localhost:7041/api/Supplier/GetAllSuppliers";
    try{
     // alert('hit try');
      const response = await axios.get(url, {
        headers: {
            
          'Authorization': formattedBearer,
          'Content-Type': 'application/json',
          // Add other necessary headers
        },});
     // alert('axios done');
      console.log(response.data);
      if(response.status===200){
        //alert('asioxs 200')
        setSupplierData(response.data);
      }
    }
    catch(err)
    {
      console.log(err);
    }
 
  }
  console.log(supplierdata);

  useEffect(()=>{

    alert("local getted");  
    var selectedproduct = localStorage.getItem('selectedproductandSelectedPrice'); 
    var selectedproductprice = localStorage.getItem('selectedproductprice');
    setselectedproduct(selectedproduct);
    setselectedprice(selectedproductprice);
      console.log("loc sel pro",selectedproduct);
  console.log("loc sel pro pri",selectedproductprice);
  },[]);

  const handlebackbtntomodal =()=>{
    alert("hitted back btn");
    navigate('/products');
  }

 

console.log(Country.getAllCountries())
console.log(State.getAllStates())
  
console.log('loca data',locationData);
console.log('sele adr id',selectedAddressId);
console.log('add lbl',addresslbl);
console.log('currentlat',latitude);
console.log('curr lon',longitude);
console.log('sel state name',selectedStateName);

console.log('userid',userid);
console.log('saved address',savedAddresses);
console.log('location data',locationData);

console.log("filteredSuppliers",filteredSuppliers);
console.log(`orderProductId`,{orderProductId});
console.log(`orderProductIndiviudalprice`,{orderProductIndiviudalprice});
console.log(`orderProductquanity`,{orderProductquanity});
console.log(`orderProductSUbscriptiontype`,{orderProductSUbscriptiontype});
console.log(`orderProductStartdate`,{orderProductStartdate});
console.log(`orderProductEnddate`,{orderProductEnddate});
console.log(`orderProductSize`,{orderProductSize});
console.log(`orderProducttimeslot`,{orderProducttimeslot});
console.log(`orderProductTotalAmounttobePaid`,{orderProductTotalAmounttobePaid});
console.log('sel addr pincode',selectedAddressPinCode);

const selectedproductPrice = localStorage.getItem('selectedproductPrice');
const selectedSizeofproduct = localStorage.getItem('selectedSizeofproduct');
const quantityofproduct = localStorage.getItem('quantityofproduct');

  return (
    <>
    <Nav/>
    <div className='Locationpage-container'>
    <ToastContainer/>
    <div className='displayordersummary' >
    <span style={{ fontWeight: '600', fontSize: '25px' }}>Order Summary</span>   
    <AiOutlineLine style={{ transform: 'rotate(90deg)',fontSize:'31px', display: 'flex', alignItems: 'center' }} /> 
     <span style={{  fontSize: '18px' }}>Items (1 item)</span>
     <AiOutlineLine style={{ transform: 'rotate(90deg)',fontSize:'31px', display: 'flex', alignItems: 'center' }} /> 
     <span style={{  fontSize: '18px',display:'flex', alignItems:'center' }}>Amount :  <span style={{fontSize:'25px', fontStyle:'normal', fontWeight:'600'}}> $ {totalamount}</span></span> 
    </div>
    <div className='backtosubmodaldiv'>
        <Button className='backtosubmodalbtn' onClick={handlebackbtntomodal}> <IoArrowBack /> Back   </Button>
    </div>
    <div className='location-heading '><h2>Location Information</h2></div>
    <div className='locationAndAdressArea'>
          <div className='location-MapDiv'>
          <div>
              		<div className="location-search-container">
              			<input className='location-search-bar-input' placeholder='search for Area,Landmark or Location'/>
             			 <FiSearch className='search-icon' />
             		 	<Button className='get-location-button' onClick={getCurrentLocation}>Get Current Location</Button>
           	 	</div>
          </div>

          <div className='MapComponent'>
          <MapComponent  setAddress={setLocationData} coordinates={coordinates} />
      
        </div>
         <div>
                <div>Latitude: {latitude}</div>
                <div>Longitude: {longitude}</div>
  </div> 

          



          <div>
          
          <div className='supplierdata-div'>
              <h3>Selected supplierID{orderselectedSupplierId}</h3>
            <div className='supplierdata-scroll-div'>
              {filteredSuppliers.map((supr) => (
                <div
                    key={supr.supplierId}

                    className={`Supplier-dataDisplay ${supr.supplierId === orderselectedSupplierId ? 'selected' : ''}`}
                      onClick={() => handleSupplierClick(supr)}
                                                        >
                  {supr.supplierId === orderselectedSupplierId ? (
                      <TbCurrentLocation style={{ width: '70px', height: '20px' }} />
                    ) : (
                      <BiCircle style={{ width: '70px', height: '20px' }} />
                  )}
                  <p className='supplierdetail-Paragraph'>{supr.name}, {supr.email} ,{supr.mobile} </p> 
                    
                              </div>
              ))}
          </div>
        </div>
  


</div>

          </div>
       
    <div className='Addresses-div'>
     
    <div>
    <h3>Saved Addresses{selectedAddressId}</h3>
    <div className='savedaddress-scroll-div'>
    {savedAddresses.map((addr) => (
      <div
        key={addr.addressId}
        className={`Saved-AddressDisplay ${addr.addressId === selectedAddressId ? 'selected' : ''}`}
        onClick={() => handleSavedAddressClick(addr)}
      >
        {addr.addressId === selectedAddressId ? (
          <TbCurrentLocation style={{ width: '70px', height: '20px' }} />
        ) : (
          <BiCircle style={{ width: '70px', height: '20px' }} />
        )}
        <p className='Address-Paragraph'>{addr.username}, {addr.houseNo} ,{addr.area}, {addr.city} ,{addr.mobileNumber} ,{addr.pincode}
        </p>        
                  </div>
    ))}
  </div>
    </div>
<div>
<div className='AdressForm-div'>
<Button onClick={handleToggleAddreessForm} className='AddAdressButton'> {showForm ? 'Cancel' : 'Add New Address'}</Button>
{selectedAddressId  && (
  <Button onClick={handlecontinuetopaymentbysavedadress} className='ContinuePymntBtn'>
    Continue to Payment
  </Button>
)}

  {showForm && !selectedAddressId && (

      <Form className='AddressForm' >
      
      <div className='AddressInputandLbl-div'>

              <div className='AddressInput-inputdiv'>

                  <input 
                  type='text'
                  className='Name-input'
                  placeholder="Enter Name"
                  onChange={e=>{setpersonNameOfAddress(e.target.value); }}
                  />
                  <input 
                  type='text'
                  className='Mobile-input'
                  placeholder="Enter Mobile"
                  onChange={e=>{setMobileNumOfAddress('+91'+e.target.value);  validatemobile('+91'+e.target.value);}}
                  />
          </div> 
          <div className='AdrressValidationError-div'>
          {validationerrors.personnameofAddress && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.personnameofAddress}</p>}
          {validationerrors.mobilenumofAddress && <p  className='AddressFormValError-p' style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.mobilenumofAddress}</p>}
      </div> 
      </div>
    
      <div className='AddressInputandLbl-div'>
           
          <div className='AddressInput-inputdiv'>

              <input 
              type='text'
              className='PinCode-input'
              placeholder="Enter Pin-Code"
              onChange={e=>{setPinCode(e.target.value); validatePinCode(e.target.value); filetringsupplierdatabypincode(e.target.value); }}
              />
              <input 
              type='text'
              className='Locality-input'
              placeholder="Enter Locality"
              onChange={e=>setLocality(e.target.value)}
              />
          </div> 
          <div className='AdrressValidationError-div'>
          {validationerrors.pincode && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.pincode}</p>}
          {validationerrors.locality && <p  className='AddressFormValError-p'  style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.locality}</p>}
    </div>
      </div>

      <div className='AddressInputandLbl-div'>
          
          <div className='AddressInput-inputdiv'>
              <input 
              type='text'
              className='Address-input'
              placeholder="Enter Address(Area & Street)"
              onChange={e=>setHouseNo(e.target.value)}
              />

          </div> 
          <div className='AdrressValidationError-div'>
          {validationerrors.houseNo && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.houseNo}</p>}
    </div>  
  </div>
  <div className='AddressInputandLbl-div'>
 <div className='AddressInput-inputdiv'>
      
            {/*}   <select value={selectedCountry} onChange={handleCountryChange}>
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                  ))}
                  </select> */}
      <select value={selectedstate} onChange={handleStateChange} className='statedropdown'>
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
              ))}
      </select>
      <select value={selectedCity} onChange={handleCityChange} className='citydropdown'>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
      </select>

        
          {/*}  <input 
            type='text'
            className='State-input'
            placeholder="Enter State"
            onChange={e=>setStatename(e.target.value)}
            /> */}
        </div> 
        <div className='AdrressValidationError-div'>
        {validationerrors.selectedCity && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.selectedCity}</p>}
        {validationerrors.selectedState && <p  className='AddressFormValError-p' style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.selectedState}</p>}
    </div>
              
</div>
    
      <div className='Addresslbl-div'>
          
          <p> Address label</p>
        
            <div className='addresslblbtn-div'>
          
            <Button
            style={{ backgroundColor: addresslbl === 'Home' ? '#66BCFF' : '#FBFAFA' }}
            className={`addresslblbtn ${addresslbl === 'Home' ? 'selected' : ''}`}
            onClick={() => handleAddressLbl('Home')}
          >
            Home
          </Button>
          <Button
          style={{ backgroundColor: addresslbl === 'Office' ? '#66BCFF' : '#FBFAFA' }}
            className={`addresslblbtn ${addresslbl === 'Office' ? 'selected' : ''}`}
            onClick={() => handleAddressLbl('Office')}
          >
            Office
          </Button>
          <Button
          style={{ backgroundColor: addresslbl === 'Other' ? '#66BCFF' : '#FBFAFA' }}
            className={`addresslblbtn ${addresslbl === 'Other' ? 'selected' : ''}`}
            onClick={() => handleAddressLbl('Other')}
          >
            Other
          </Button>
            </div>
            <div className='AdrressValidationError-div'>
            {validationerrors.addresslbl && <p  className="AddressFormValError-p" style={{color:"deeppink",fontSize:'medium'}}>{validationerrors.addresslbl}</p>}
      </div>
        </div>


    <div >
      <Button className='submit-Button' type="submit" variant="primary" onClick={handlenewaddresssubmitform}>
        Add & Continue to Payment
      </Button>
    </div>
      </Form>
      )}
      </div>

    

    </div>
</div>
    
  
    
    
    </div>
       
      </div>
     {/*} {openModal && selectedProduct && (
        <SubscriptionModal
          product={selectedProduct}
          Priceofselectedproduct={selectedProduct.selectedPrice}
          handleClose={handleCloseModal}
        />
     )} */}



    </>
  )
}

export default Location




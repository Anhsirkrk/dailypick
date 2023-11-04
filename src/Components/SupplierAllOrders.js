import React,{useState,useEffect} from 'react';
import axios   from 'axios';
import { Table } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

const SupplierAllOrders = () => {
    const today = new Date();
    const [ordersdata, setOrdersdata] = useState([]);
  const [supplierId,setSupplierId]= useState('1');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filtereddata,setFilteredData]=useState([]);
    const [sortDirection, setSortDirection] = useState('asc'); // Default to descending
  
  
    const [fromDate, setFromDate] = useState('');
    const [toDate, setTODate] = useState('');
  
  
    useEffect(() => {
      gettingorderDetails();
        }, []);
  
    const gettingorderDetails = async () => {
      const supplierId = 1;
      const url = `https://localhost:7041/api/Supplier/GetSupplierOrderDetailsBySupplierId?supplierId=${supplierId}`;
      try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
          setOrdersdata(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    }
  
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
  
  
    const handleStatusChange = (e) => {
      alert(e.target.value);
      const selectedvalue= e.target.value;
      setSelectedStatus(selectedvalue);
    
      if(selectedvalue=== ""){
        setFilteredData(ordersdata);
      }
      else{
        setFilteredData(ordersdata.filter(orders => {
          return selectedvalue === "" || orders.orderStatus === selectedvalue;
        }));
      }
         };
  
    const handleSort = () => {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      setFilteredData(filtereddata.slice().sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }));
    };
  
   
  const toggleSortDirection = () => {
    setSortDirection(prevDirection => prevDirection === 'desc' ? 'asc' : 'desc');
  }
  
    const handleFromDateChange = (e) => {
      setFromDate(e.target.value);
    };
  
    const handleTODateChange = (e) => {
      setTODate(e.target.value);
    };
  
    const handleFilterByDate = () => {
      const filteredByDate = ordersdata.filter(order => {
        const orderStartDate = new Date(order.startDate);
        const orderEndDate = new Date(order.endDate);
        const selectedFromDate = new Date(fromDate);
        const selectedToDate = new Date(toDate);
        
      const isFromDateInRange = selectedFromDate >= orderStartDate && selectedFromDate <= orderEndDate;
      
      const isToDateInRange = selectedToDate >= orderStartDate && selectedToDate <= orderEndDate;
  
      return isFromDateInRange || isToDateInRange;
      });
      setFilteredData(filteredByDate);
    };
  
  
  
    const handleClearFilter = () => {
      setFromDate(''); // Reset fromDate to empty string
      setTODate(''); // Reset toDate to empty string
      setFilteredData(ordersdata); // Reset filtered data to original orders data
    };
  
    return (
      <div>
        
      <h4 className='orderhistory-heading'>All Orders</h4>

      <div className='Supplierorderhistory-headingandfilterdiv'>

      <div className='navsearchinput-container'>
      <input type='text' class='navsearchinput' placeholder='Search Order Id'></input>
      <div className='navsearchicon'><FiSearch style={{color:'var(--Gry, #7D7D7D)'}}/></div>
      </div>

      <label htmlFor="fromDate">From</label>
      <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} />

      <label htmlFor="toDate">To</label>
      <input type="date" id="toDate" value={toDate} onChange={handleTODateChange} />
      <button type='button' onClick={handleFilterByDate}>Apply Date Filter</button>
      <button type='button' onClick={handleClearFilter}>Clear Filter</button>

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
          <option value="To be Delivered">To be Delivered</option>
          <option value="Approval Pending from Supplier">Approval Pending from Supplier</option>
          <option value="Scheduled Changed">Scheduled Changed</option>
          <option value="User Not AVailable">User Not AVailable</option>
          <option value="Cancelled By User">Cancelled By User</option>
          <option value="Rejected By Supplier">Rejected By Supplier</option>
        </select>
      </div>
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
  


export default SupplierAllOrders
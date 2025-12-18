// Success.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Accordion, ListGroup , Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const PaymentSucess = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [orderData , setOrderData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');
    
    if (sessionId) {
      setLoading(true)
      axios.post('api/v1/payment/retrieve-session', { sessionId })
        .then(response => {
          setOrder(response.data.session);
          setOrderData(response.data.order)
          
          sessionStorage.removeItem('cart')
          localStorage.setItem('order' , JSON.stringify(response.data.order))
          setLoading(false);  
        })
        .catch(error => {
          setError('Failed to fetch orderData details');
          setLoading(false);
        });
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [location.search]);

  return (
    <div className="container mt-5">
      {loading && <Loader/>}
      {error && <div className="alert alert-danger">{error}</div>}
      {order && (
           <div className="container mt-4">
           <h1 className="mb-4">order Summary</h1>
     
           {/* Accordion for all sections */}
           <Accordion defaultActiveKey="0">
             
             {/* orderData Details Accordion */}
             <Accordion.Item eventKey="0">
               <Accordion.Header>orderData Details</Accordion.Header>
               <Accordion.Body>
                 <p><strong>order ID:</strong> {orderData.orderId}</p>
                 <p><strong>Total Items:</strong> {orderData.totalItems}</p>
                 <p><strong>Currency:</strong> {orderData.currency.toUpperCase()}</p>
                 <p><strong>Status:</strong> <span className={`badge ${orderData.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>{orderData.status}</span></p>
                 <p><strong>Created At:</strong> {new Date(orderData.createdAt).toLocaleString()}</p>
               </Accordion.Body>
             </Accordion.Item>
     
             {/* Cart Data Accordion */}
             <Accordion.Item eventKey="1">
               <Accordion.Header>Products</Accordion.Header>
               <Accordion.Body>
                 {orderData.cartData.length ? (
                   <ListGroup variant="flush">
                     {orderData.cartData.map((item, index) => (
                       <ListGroup.Item key={item._id.$oid} className="mb-2">
                        <img src={item?.id?.frontImage } width = "70px"/>
                         <div><strong>Product Name:</strong> {item.name}</div>
                         <div><strong>Quantity:</strong> {item.quantity}</div>
                         <div><strong>Price:</strong> ${item.price}</div>
                       </ListGroup.Item>
                     ))}
                   </ListGroup>
                 ) : (
                   <p>No items in products</p>
                 )}
               </Accordion.Body>
             </Accordion.Item>
     
             {/* Shipping Details Accordion */}
             <Accordion.Item eventKey="2">
               <Accordion.Header>Shipping Details</Accordion.Header>
               <Accordion.Body>
                 <p><strong>Name:</strong> {orderData.shipping_details[0].name}</p>
                 <p><strong>Address:</strong> {orderData.shipping_details[0].address.line1}, {orderData.shipping_details[0].address.city}, {orderData.shipping_details[0].address.state}, {orderData.shipping_details[0].address.country} - {orderData.shipping_details[0].address.postal_code}</p>
               </Accordion.Body>
             </Accordion.Item>
     
             {/* Billing Details Accordion */}
             <Accordion.Item eventKey="3">
               <Accordion.Header>Billing Details</Accordion.Header>
               <Accordion.Body>
                 <p><strong>Name:</strong> {orderData.billing_Details[0].name}</p>
                 <p><strong>Email:</strong> {orderData.billing_Details[0].email}</p>
                 <p><strong>Phone:</strong> {orderData.billing_Details[0].phone}</p>
                 <p><strong>Address:</strong> {orderData.billing_Details[0].address.line1}, {orderData.billing_Details[0].address.city}, {orderData.billing_Details[0].address.state}, {orderData.billing_Details[0].address.country} - {orderData.billing_Details[0].address.postal_code}</p>
               </Accordion.Body>

               
             </Accordion.Item>
     
           </Accordion>
           <Button variant={"primary"} className="mt-4 text-center" onClick={(e)=>{
            e.preventDefault();
            navigate(`/order/${orderData._id}`)
           }}>Check your Order</Button>
         </div>
      )}
    </div>
  );
};

export default PaymentSucess;

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  CircularProgress,
  Alert,
  Badge
} from '@mui/material';
import { Link, useParams } from "react-router-dom";
import instance from "../constant/instance";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrderDetails = () => {
    const { id } = useParams()
    const [orderData, setOrderData] = useState({})

    const getOrderDetails = async() =>{
        try{
          const { data }  = await instance.get(`/order/${id}`)
          console?.log(data)
          setOrderData({...data?.data}) 
        } catch(err) {
           console?.log(err)
        }
    }


    useEffect(() =>{
        getOrderDetails()
    },[])

   

  return (
    <Box className="container" sx={{ mt: 5 }}>
      {/* {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>} */}
      {orderData && (
        <Box className="container" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Order Summary
          </Typography>

       
            {/* Order Data Details Accordion */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Order Data Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><strong>Order ID:</strong> {orderData?.orderId}</Typography>
                <Typography><strong>Total Items:</strong> {orderData?.totalItems}</Typography>
                <Typography><strong>Total Amount:</strong> {orderData?.totalAmount}</Typography>
                <Typography><strong>Currency:</strong> {orderData?.currency?.toUpperCase()}</Typography>
                <Typography>
                  <strong >Status:</strong>
                  <Badge
                     style ={{ marginLeft : "70px"}}
                    color={orderData?.status === 'pending' ? 'warning' : 'success'}
                    badgeContent={orderData?.status?.toUpperCase()}
                  />
                </Typography>
                <Typography>
                  <strong>Created At:</strong> {new Date(orderData?.createdAt)?.toLocaleString()}
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Cart Data Accordion */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Products</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {orderData?.cartData?.length ? (
                  <List>
                    {orderData?.cartData?.map((item, index) => (
                      <ListItem key={item?._id?.$oid} sx={{ mb: 2 }}>
                      <a href={item.designId ? `https://easyjackets.com/Design/${item.designId._id}?custom=true`: `https://easyjackets.com/product/${item.slug}`} target="_blank">
                        <ListItemAvatar>
                          <Avatar src={item?.designId ? item?.designId?.custom_image :item?.id?.frontImage} variant="square" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Product Name: ${item?.name}`}
                          secondary={
                            <>
                              <Typography variant="body2">
                                <strong>Quantity:</strong> {item?.quantity}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Price:</strong> ${item?.price}
                              </Typography>
                              <Typography variant="body2">
                                <strong>SKU:</strong> {item?._id ? item?._id.sku : 'It is a custom design so no SKU'}
                              </Typography>
                            </>
                          }
                        />
                          </a>
                      </ListItem>
                    
                    ))}
                  </List>
                ) : (
                  <Typography>No items in products</Typography>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Shipping Details Accordion */}
            <Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography>Shipping Details</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {orderData?.shipping_details?.length ? (
      <>
        <Typography><strong>Name:</strong> {orderData?.shipping_details?.[0]?.name || 'N/A'}</Typography>
        <Typography>
          <strong>Address:</strong> 
          {orderData?.shipping_details?.[0]?.address?.line1 || 'N/A'}, 
          {orderData?.shipping_details?.[0]?.address?.city || 'N/A'}, 
          {orderData?.shipping_details?.[0]?.address?.state || 'N/A'}, 
          {orderData?.shipping_details?.[0]?.address?.country || 'N/A'} - 
          {orderData?.shipping_details?.[0]?.address?.postal_code || 'N/A'}
        </Typography>
      </>
    ) : (
      <Typography>No shipping details available</Typography>
    )}
  </AccordionDetails>
</Accordion>

            {/* Billing Details Accordion */}
            <Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography>Billing Details</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {orderData?.billing_Details?.length ? (
      <>
        <Typography><strong>Name:</strong> {orderData?.billing_Details?.[0]?.name || 'N/A'}</Typography>
        <Typography><strong>Email:</strong> {orderData?.billing_Details?.[0]?.email || 'N/A'}</Typography>
        <Typography><strong>Phone:</strong> {orderData?.billing_Details?.[0]?.phone || 'N/A'}</Typography>
        <Typography>
          <strong>Address:</strong> 
          {orderData?.billing_Details?.[0]?.address?.line1 || 'N/A'}, 
          {orderData?.billing_Details?.[0]?.address?.city || 'N/A'}, 
          {orderData?.billing_Details?.[0]?.address?.state || 'N/A'}, 
          {orderData?.billing_Details?.[0]?.address?.country || 'N/A'} - 
          {orderData?.billing_Details?.[0]?.address?.postal_code || 'N/A'}
        </Typography>
      </>
    ) : (
      <Typography>No billing details available</Typography>
    )}
  </AccordionDetails>
</Accordion>

        </Box>
      )}
    </Box>
  );
};

export default OrderDetails;

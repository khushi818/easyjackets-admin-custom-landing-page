import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import moment from "moment"
import instance from '../constant/instance';
import { useParams } from 'react-router-dom';



const BulkOrder = () => { 
      const {id} = useParams()
     const [data,setData] = useState({})
      
     const getOrderDetails =async() => {
        try {
            const { data } = await instance.get(`/order/bulk/${id}`);
            setData(data.bulkorder);
            
          } catch (error) {
            console.error("Error fetching products:", error);
          }
     }
      const formatDesignLocations = (designLocations) => {
        return Object.keys(designLocations)
          .filter(location => designLocations[location])
          .join(', ');
      };

      useEffect(() =>{
          getOrderDetails()
      },[])
  return (
    <TableContainer component={Paper}>
        <h1>Details</h1>
      <Table sx={{ minWidth: 650 }} aria-label="product details table">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Selected Product</TableCell>
            <TableCell>{data?.selectedProduct}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Zipout Lining</TableCell>
            <TableCell>{data?.zipoutLining ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Flap Closure</TableCell>
            <TableCell>{data?.flapClosure ? 'Yes' : 'No'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Selected Closure</TableCell>
            <TableCell>{data?.selectedClosure}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Selected Lining</TableCell>
            <TableCell>{data?.selectedLining}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Images</TableCell>
          <TableCell>
          {data && data.images && Array.isArray(data.images) && data.images.length > 0 ? (
    data.images.map((image, index) => (
      <a href={image} target="_blank" rel="noopener noreferrer" key={index}>
        <Avatar src={image} alt={`Product Image ${index + 1}`} sx={{ marginRight: 2 }} />
      </a>
    ))
  ) : (
    <span>No Images Available</span> // Handle case when no images are available
  )}
</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Design Locations</TableCell>
            <TableCell>{formatDesignLocations(data?.designLocations ?  data?.designLocations : {})}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{data.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell>{data.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>{data.country}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell>{data.message}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BulkOrder;

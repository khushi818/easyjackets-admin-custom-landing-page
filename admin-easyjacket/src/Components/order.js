import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, TextField, Typography, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import instance from '../constant/instance';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusEnum, setStatusEnum] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getAllOrders = async () => {
    try {
      const { data } = await instance.get('/order', { 
        params: { name, date, address, phone, status, page: currentPage, limit: pageSize } 
      });
      setOrders(data.data);
      setStatusEnum(data.statusEnum);
      setTotalPages(Number(data.totalOrder));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await instance.put(`/order/${id}?page=${currentPage}&limit=5`, { status: newStatus });
      getAllOrders(); // Re-fetch orders to update status
    } catch (err) {
      console.log(err);
    }
  };

 

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page
    getAllOrders();
  };

  useEffect(() =>{
    getAllOrders()
 }, [currentPage])

  return (
    <div>
      {/* Search Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField label="Customer Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {statusEnum.map((stat) => (
            <MenuItem key={stat} value={stat}>{stat}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </div>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length !== 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.shipping_details[0]?.name}</TableCell>
                  <TableCell>{order.totalItems}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {statusEnum.map((stat) => (
                        <MenuItem key={stat} value={stat}>{stat}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" component={Link} to={`/orders/${order._id}`}>
                      More Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No Orders Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default Orders;

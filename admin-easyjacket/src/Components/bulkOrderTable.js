import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import DesignBulkModal from './designbulkmodal';
import { useNavigate } from 'react-router-dom';
import instance from '../constant/instance';

// Sample orders data (replace with your actual data)

const OrderBulkTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order for the modal
  const [orders , setOrders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()

  const handleOpenModal = (order) => {
    setSelectedOrder(order); // Set selected order data
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const getOrders = async () => {
    try {
      const { data } = await instance.get(`/order/bulk?page=${currentPage}&limit=10`);
      setOrders(data.bulkorders);
      setTotalPages(data?.totalPages);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() =>{
    getOrders()
  },[currentPage])

  useEffect(()=>{
    getOrders()
  },[])
  
  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Lining</TableCell>
            <TableCell>Closure</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order?.name}</TableCell>
              <TableCell>{order?.email}</TableCell>
              <TableCell>{order?.selectedProduct}</TableCell>
              <TableCell>{order?.selectedLining}</TableCell>
              <TableCell>{order?.selectedLining}</TableCell>
              <TableCell>{order?.quantity}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal(order)}
                  style={{marginBottom : '10px' , display: 'block'}}
                >
                  Design Points
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/bulkorder/${order._id}`)}
                >
                  View Order Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Order Details Modal */}
      {selectedOrder && (
        <DesignBulkModal
          open={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder} // Pass the selected order data to the modal
        />
      )}
    </TableContainer>
     <div className="pagination" style ={{ display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'  , marginTop : '20px'}}>
     <Button
       variant="contained"
        color="primary"
       onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
       disabled={currentPage === 1}
     >
       Previous
     </Button>
     <span>{`Page ${currentPage} of ${totalPages}`}</span>
     <Button
         variant="contained"
         color="primary"
       onClick={() =>
         currentPage < totalPages && setCurrentPage(currentPage + 1)
       }
       disabled={currentPage === totalPages}
     >
       Next
     </Button>
     </div>
     </>
  );
};

export default OrderBulkTable;

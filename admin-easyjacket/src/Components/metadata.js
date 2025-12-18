import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Modal, Box, Typography
} from '@mui/material';
import instance from '../constant/instance';

const MetadataManager = () => {
  const [metadataList, setMetadataList] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', keywords: '', route: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchMetadata();
  }, []);

  // Fetch metadata
  const fetchMetadata = async () => {
    try {
      const response = await instance.get('/metadata');
      setMetadataList(response.data.metadata);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit for creating or updating metadata
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await instance.put(`/metadata/${formData.route}`, formData);
      } else {
        await instance.post('/metadata', formData);
      }
      setFormData({ title: '', description: '', keywords: '', route: '' });
      fetchMetadata();
      setIsEditMode(false);
      setOpenModal(false);
    } catch (error) {
      console.error('Error submitting metadata:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (metadata) => {
    setFormData(metadata);
    setIsEditMode(true);
    setOpenModal(true);
  };

  // Handle delete button click
  const handleDelete = async (route) => {
    try {
      await instance.delete(`/metadata/${route}`);
      fetchMetadata();
    } catch (error) {
      console.error('Error deleting metadata:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Metadata Management</Typography>

      {/* Button to open modal for adding new metadata */}
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>Add New Metadata</Button>

      {/* Table displaying metadata records */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metadataList.map((metadata) => (
              <TableRow key={metadata.route}>
                <TableCell>{metadata.title}</TableCell>
                <TableCell>{metadata.description}</TableCell>
                <TableCell>{metadata.keywords}</TableCell>
                <TableCell>{metadata.route}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(metadata)} color="primary">Edit</Button>
                  <Button onClick={() => handleDelete(metadata.route)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Create/Edit Form */}
      <Modal open={openModal} onClose={() => { setOpenModal(false); setIsEditMode(false); }}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" gutterBottom>{isEditMode ? 'Edit Metadata' : 'Add Metadata'}</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Keywords (comma-separated)"
              name="keywords"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Route"
              name="route"
              value={formData.route}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled={isEditMode} // Disable editing route in edit mode
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              {isEditMode ? 'Update Metadata' : 'Create Metadata'}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default MetadataManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import instance from '../constant/instance';

const Size = () => {
  const [sizes, setSizes] = useState([]);
  const [formValues, setFormValues] = useState({
    size: '',
    chest: '',
    waist: '',
    sleeves: '',
    backlength: '',
    jchest: '',
    jsleeves: '',
    jashoulder: '',
    jshoulder: '',
    jbacklength: '',
    price: '',
    fprice: ''
  });
  const [selectedSize, setSelectedSize] = useState(null);

  // Fetch all sizes
  useEffect(() => {
    instance.get('/property/sizes')
      .then(response => setSizes(response.data.sizes))
      .catch(error => console.error("Error fetching sizes:", error));
  }, []);

  // Handle create or update
  const handleSave = async () => {
    const url = selectedSize ? `/property/sizes/${selectedSize._id}` : '/property/sizes';
    const method = selectedSize ? 'put' : 'post';
    const data = formValues;

    try {
      const response = await instance[`${method}`](url, data);
      const updatedSizes = selectedSize
        ? sizes.map(size => (size._id === response.data.size._id ? response.data.size : size))
        : [...sizes, response.data.size];
      setSizes(updatedSizes);
      resetForm();
    } catch (error) {
      console.error("Error saving size:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await instance.delete(`/property/sizes/${id}`);
      setSizes(sizes.filter(size => size._id !== id));
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues({
      size: '',
      chest: '',
      waist: '',
      sleeves: '',
      backlength: '',
      jchest: '',
      jsleeves: '',
      jashoulder: '',
      jshoulder: '',
      jbacklength: '',
      price: '',
      fprice: ''
    });
    setSelectedSize(null);
  };

  // Handle edit
  const handleEdit = (size) => {
    setFormValues({
      size: size.size,
      chest: size.chest,
      waist: size.waist,
      sleeves: size.sleeves,
      backlength: size.backlength,
      jchest: size.jchest,
      jsleeves: size.jsleeves,
      jashoulder: size.jashoulder,
      jshoulder: size.jshoulder,
      jbacklength: size.jbacklength,
      price: size.price,
      fprice: size.fprice
    });
    setSelectedSize(size);
  };

  const columns = [
    { field: 'size', headerName: 'Size', width: 150 },
    { field: 'chest', headerName: 'Chest', width: 150 },
    { field: 'waist', headerName: 'Waist', width: 150 },
    { field: 'sleeves', headerName: 'Sleeves', width: 150 },
    { field: 'backlength', headerName: 'Back Length', width: 150 },
    { field: 'jchest', headerName: 'J. Chest', width: 150 },
    { field: 'jsleeves', headerName: 'J. Sleeves', width: 150 },
    { field: 'jashoulder', headerName: 'J. Shoulder', width: 150 },
    { field: 'jshoulder', headerName: 'J. Shoulder', width: 150 },
    { field: 'jbacklength', headerName: 'J. Back Length', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'fprice', headerName: 'F. Price', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Size Manager
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedSize ? 'Update Size' : 'Add New Size'}</Typography>
              {Object.keys(formValues).map(key => (
                <TextField
                  key={key}
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  fullWidth
                  margin="normal"
                  value={formValues[key]}
                  onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
                />
              ))}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                {selectedSize ? 'Update' : 'Save'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <div>
          <Typography variant="h5">Size List</Typography>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={sizes}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
          </div>
      </Grid>
    </Container>
  );
};

export default Size;

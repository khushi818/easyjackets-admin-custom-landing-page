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
import instance from '../constant/instance';

function Collars() {
  const [collars, setCollars] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCollar, setSelectedCollar] = useState(null);

  // Fetch all collars
  useEffect(() => {
    instance.get('/property/collars')
      .then(response => setCollars(response.data.collars))
      .catch(error => console.error("Error fetching collars:", error));
  }, []);

  // Handle create or update
  const handleSave =async() => {
    const url = selectedCollar ? `/property/collars/${selectedCollar._id}` : '/property/collars';
    const method = selectedCollar ? 'put' : 'post';
    const data = { name, price };

    await instance[`${method}`](url , data)
      .then(response => {
        const newCollars = selectedCollar
          ? collars.map(collar => (collar._id === response.data.collar._id ? response.data.collar : collar))
          : [...collars, response.data.collar];
        setCollars(newCollars);
        resetForm();
      })
      .catch(error => console.error("Error saving collar:", error));
  };

  // Handle delete
  const handleDelete = async(id) => {
    await instance.delete(`/property/collars/${id}`)
      .then(() => setCollars(collars.filter(collar => collar._id !== id)))
      .catch(error => console.error("Error deleting collar:", error));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedCollar(null);
  };

  // Handle edit
  const handleEdit = (collar) => {
    setName(collar.name);
    setPrice(collar.price);
    setSelectedCollar(collar);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Collars
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedCollar ? 'Update Collar' : 'Add New Collar'}</Typography>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                {selectedCollar ? 'Update' : 'Save'}
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

        <Grid item xs={12} md={6}>
          <Typography variant="h5">Collar List</Typography>
          {collars.map(collar => (
            <Card key={collar._id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">{collar.name}</Typography>
                <Typography>Price: ${collar.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(collar)}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(collar._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Collars;

import React, { useState, useEffect } from 'react';
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

function Pockets() {
  const [pockets, setPockets] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedPocket, setSelectedPocket] = useState(null);

  // Fetch all Pockets
  useEffect(() => {
    instance.get('/property/pockets')
      .then(response => setPockets(response.data.pockets))
      .catch(error => console.error("Error fetching Pockets:", error));
  }, []);

  // Handle create or update
  const handleSave = async () => {
    const url = selectedPocket ? `/property/pockets/${selectedPocket._id}` : '/property/pockets';
    const method = selectedPocket ? 'put' : 'post';
    const data = { name, price };

    await instance[`${method}`](url, data)
      .then(response => {
        const newPockets = selectedPocket
          ? pockets.map(pocket => (pocket._id === response.data.pocket._id ? response.data.pocket : pocket))
          : [...pockets, response.data.pocket];
        setPockets(newPockets);
        resetForm();
      })
      .catch(error => console.error("Error saving Pocket:", error));
  };

  // Handle delete
  const handleDelete = async (id) => {
    await instance.delete(`/property/pockets/${id}`)
      .then(() => setPockets(pockets.filter(pocket => pocket._id !== id)))
      .catch(error => console.error("Error deleting Pocket:", error));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedPocket(null);
  };

  // Handle edit
  const handleEdit = (pocket) => {
    setName(pocket.name);
    setPrice(pocket.price);
    setSelectedPocket(pocket);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pockets
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedPocket ? 'Update Pocket' : 'Add New Pocket'}</Typography>
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
                {selectedPocket ? 'Update' : 'Save'}
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
          <Typography variant="h5">Pockets List</Typography>
          {pockets.map(pocket => (
            <Card key={pocket._id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">{pocket.name}</Typography>
                <Typography>Price: ${pocket.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(pocket)}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(pocket._id)}
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

export default Pockets;

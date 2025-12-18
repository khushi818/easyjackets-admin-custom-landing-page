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

function Linings() {
  const [linings, setLinings] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedLining, setSelectedLining] = useState(null);

  // Fetch all Linings
  useEffect(() => {
    instance.get('/property/linings')
      .then(response => setLinings(response.data.linings))
      .catch(error => console.error("Error fetching Linings:", error));
  }, []);

  // Handle create or update
  const handleSave = async () => {
    const url = selectedLining ? `/property/linings/${selectedLining._id}` : '/property/linings';
    const method = selectedLining ? 'put' : 'post';
    const data = { name, price };

    await instance[`${method}`](url, data)
      .then(response => {
        const newLinings = selectedLining
          ? linings.map(lining => (lining._id === response.data.lining._id ? response.data.lining : lining))
          : [...linings, response.data.lining];
        setLinings(newLinings);
        resetForm();
      })
      .catch(error => console.error("Error saving Lining:", error));
  };

  // Handle delete
  const handleDelete = async (id) => {
    await instance.delete(`/property/linings/${id}`)
      .then(() => setLinings(linings.filter(lining => lining._id !== id)))
      .catch(error => console.error("Error deleting Lining:", error));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedLining(null);
  };

  // Handle edit
  const handleEdit = (lining) => {
    setName(lining.name);
    setPrice(lining.price);
    setSelectedLining(lining);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Linings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedLining ? 'Update Lining' : 'Add New Lining'}</Typography>
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
                {selectedLining ? 'Update' : 'Save'}
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
          <Typography variant="h5">Linings List</Typography>
          {linings.map(lining => (
            <Card key={lining._id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">{lining.name}</Typography>
                <Typography>Price: ${lining.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(lining)}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(lining._id)}
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

export default Linings;

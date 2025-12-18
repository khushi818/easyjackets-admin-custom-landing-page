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

function Closures() {
  const [closures, setClosures] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedClosure, setSelectedClosure] = useState(null);

  // Fetch all Closures
  useEffect(() => {
    instance.get('/property/closures')
      .then(response => setClosures(response.data.closures))
      .catch(error => console.error("Error fetching Closures:", error));
  }, []);

  // Handle create or update
  const handleSave = async () => {
    const url = selectedClosure ? `/property/closures/${selectedClosure._id}` : '/property/closures';
    const method = selectedClosure ? 'put' : 'post';
    const data = { name, price };

    await instance[`${method}`](url, data)
      .then(response => {
        const newClosures = selectedClosure
          ? closures.map(closure => (closure._id === response.data.closure._id ? response.data.closure : closure))
          : [...closures, response.data.closure];
        setClosures(newClosures);
        resetForm();
      })
      .catch(error => console.error("Error saving Closure:", error));
  };

  // Handle delete
  const handleDelete = async (id) => {
    await instance.delete(`/property/closures/${id}`)
      .then(() => setClosures(closures.filter(closure => closure._id !== id)))
      .catch(error => console.error("Error deleting Closure:", error));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedClosure(null);
  };

  // Handle edit
  const handleEdit = (closure) => {
    setName(closure.name);
    setPrice(closure.price);
    setSelectedClosure(closure);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Closures
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedClosure ? 'Update Closure' : 'Add New Closure'}</Typography>
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
                {selectedClosure ? 'Update' : 'Save'}
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
          <Typography variant="h5">Closures List</Typography>
          {closures.map(closure => (
            <Card key={closure._id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">{closure.name}</Typography>
                <Typography>Price: ${closure.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(closure)}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(closure._id)}
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

export default Closures;

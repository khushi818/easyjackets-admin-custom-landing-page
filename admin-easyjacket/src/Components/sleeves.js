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

function Sleeves() {
  const [sleeves, setSleeves] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedSleeves, setSelectedSleeves] = useState(null);

  const fetchSleeves = () =>{
    instance.get('/property/Sleeves')
    .then(response => setSleeves(response.data.sleeves))
    .catch(error => console.error("Error fetching Sleeves:", error));
  }
  // Fetch all Sleeves
  useEffect(() => {
       fetchSleeves()
  }, []);

  // Handle create or update
  const handleSave =async() => {
    const url = selectedSleeves ? `/property/sleeves/${selectedSleeves._id}` : '/property/sleeves';
    const method = selectedSleeves ? 'put' : 'post';
    const data = { name, price };

    await instance[`${method}`](url , data)
      .then(response => {
        const newSleeves = selectedSleeves
          ? sleeves.map(sleeve => (sleeves._id === response.data.sleeves._id ? response.data.sleeves : sleeve))
          : [...sleeves, response.data.sleeves];
        setSleeves(newSleeves);
        resetForm();
      })
      .catch(error => console.error("Error saving Sleeve:", error));

      fetchSleeves()
  };

  // Handle delete
  const handleDelete = async(id) => {
    await instance.delete(`/property/Sleeves/${id}`)
      .then(() => setSleeves(sleeves.filter(sleeve => sleeve._id !== id)))
      .catch(error => console.error("Error deleting Sleeve:", error));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedSleeves(null);
  };

  // Handle edit
  const handleEdit = (Sleeve) => {
    setName(Sleeve.name);
    setPrice(Sleeve.price);
    setSelectedSleeves(Sleeve);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sleeves
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedSleeves ? 'Update Sleeves' : 'Add New Sleeves'}</Typography>
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
                {selectedSleeves ? 'Update' : 'Save'}
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
          <Typography variant="h5">Sleeves List</Typography>
          {sleeves.map(Sleeve => (
            <Card key={Sleeve._id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">{Sleeve.name}</Typography>
                <Typography>Price: ${Sleeve.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(Sleeve)}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(Sleeve._id)}
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

export default Sleeves;

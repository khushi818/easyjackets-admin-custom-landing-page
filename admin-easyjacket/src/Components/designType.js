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
import instance from '../constant/instance'; // Adjust the path as necessary

function DesignType() {
  const [designTypes, setDesignTypes] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedDesignType, setSelectedDesignType] = useState(null);

  // Fetch all Design Types
  useEffect(() => {
    instance.get('/property/designTypes')
      .then(response => setDesignTypes(response.data.designTypes))
      .catch(error => console.error("Error fetching Design Types:", error));
  }, []);

  // Handle create or update
  const handleSave = async () => {
    const url = selectedDesignType ? `/property/designTypes/${selectedDesignType._id}` : '/property/designTypes';
    const method = selectedDesignType ? 'put' : 'post';
    const data = { name, price };

    await instance[method](url, data)
      .then(response => {
        const newDesignTypes = selectedDesignType
          ? designTypes.map(dt => (dt._id === response.data.designType._id ? response.data.designType : dt))
          : [...designTypes, response.data.designType];
        setDesignTypes(newDesignTypes);
        resetForm();
      })
      .catch(error => console.error("Error saving Design Type:", error));
  };

  // Handle delete
  const handleDelete = async (id) => {
    await instance.delete(`/property/designTypes/${id}`)
      .then(() => setDesignTypes(designTypes.filter(dt => dt._id !== id)))
      .catch(error => console.error("Error deleting Design Type:", error));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedDesignType(null);
  };

  // Handle edit
  const handleEdit = (designType) => {
    setName(designType.name);
    setPrice(designType.price);
    setSelectedDesignType(designType);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Design Types
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedDesignType ? 'Update Design Type' : 'Add New Design Type'}</Typography>
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
                {selectedDesignType ? 'Update' : 'Save'}
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
          <Typography variant="h5">Design Types List</Typography>
          {designTypes.map(dt => (
            <Card key={dt._id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6">{dt.name}</Typography>
                <Typography>Price: ${dt.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(dt)}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(dt._id)}
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

export default DesignType;

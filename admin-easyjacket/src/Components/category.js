import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import instance from '../constant/instance';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  // Fetch categories from the server
  const fetchCategories = async () => {
    const response = await instance.get('/category/get-category');
    
    setCategories(response.data.category);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission for updating a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    await instance.put(`/category/update-category/${currentId}`, formData);

    // Clear form fields
    setName('');
    setImage(null);
    setCurrentId(null);
    fetchCategories();
  };

  // Fill form for editing a category
  const handleEdit = (category) => {
    setName(category.name);
    setCurrentId(category._id);
    setImage(null); // Reset image if editing
  };

  return (
    <Container>
      <h1>Category Management</h1>
      {currentId && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button type="submit" variant="contained">
            Update Category
          </Button>
        </form>
      )}

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{category.name}</Typography>
                {category.image && (
                  <img
                    src={`${category.image}`} 
                    alt={category.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <IconButton onClick={() => handleEdit(category)}>
                  <Edit />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;

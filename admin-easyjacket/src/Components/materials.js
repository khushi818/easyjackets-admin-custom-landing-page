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
import instance from '../constant/instance'; // Adjust the path as necessary

function Material() {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [sleeves, setSleeves] = useState('');
  const [bodyPrice, setBodyPrice] = useState('');
  const [sleevesPrice, setSleevesPrice] = useState('');
  const [matParent, setMatParent] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [id , setId] = useState(null)
  // Fetch all Materials
  useEffect(() => {
    instance.get('/property/materials')
      .then(response => setMaterials(response.data.materials))
      .catch(error => console.error("Error fetching Materials:", error));
  }, []);

  // Handle create or update
  const handleSave = async () => {
    const url = selectedMaterial ? `/property/materials/${selectedMaterial.id}` : '/property/materials';
    const method = selectedMaterial ? 'put' : 'post';
    const data = { name, body, sleeves, bodyPrice, sleevesPrice, matParent };

    await instance[method](url, data)
      .then(response => {
        const newMaterials = selectedMaterial
          ? materials.map(mat => (mat._id === response.data.material._id ? response.data.material : mat))
          : [...materials, response.data.material];
        setMaterials(newMaterials);
        resetForm();
      })
      .catch(error => console.error("Error saving Material:", error));
  };

  // Handle delete
  const handleDelete = async (id) => {
    await instance.delete(`/property/materials/${id}`)
      .then(() => setMaterials(materials.filter(mat => mat._id !== id)))
      .catch(error => console.error("Error deleting Material:", error));
  };

  // Reset form
  const resetForm = () => {
    setId('')
    setName('');
    setBody('');
    setSleeves('');
    setBodyPrice('');
    setSleevesPrice('');
    setMatParent('');
    setSelectedMaterial(null);
  };

  // Handle edit
  const handleEdit = (material) => {

    setId(material.id)
    setName(material.name);
    setBody(material.body);
    setSleeves(material.sleeves);
    setBodyPrice(material.bodyPrice);
    setSleevesPrice(material.sleevesPrice);
    setMatParent(material.matParent);
    setSelectedMaterial(material);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 }, 
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'body', headerName: 'Body', width: 150 },
    { field: 'sleeves', headerName: 'Sleeves', width: 150 },
    { field: 'bodyPrice', headerName: 'Body Price', width: 150 },
    { field: 'sleevesPrice', headerName: 'Sleeves Price', width: 150 },
    { field: 'matParent', headerName: 'Material Parent', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  const rows = materials.map((mat, index) => ({
    id : mat._id,
    name: mat.name,
    body: mat.body,
    sleeves: mat.sleeves,
    bodyPrice: mat["body-price"],
    sleevesPrice: mat["sleeves-price"],
    matParent: mat["mat-parent"]
  }));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Materials
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedMaterial ? 'Update Material' : 'Add New Material'}</Typography>
             
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Body"
                fullWidth
                margin="normal"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <TextField
                label="Sleeves"
                fullWidth
                margin="normal"
                value={sleeves}
                onChange={(e) => setSleeves(e.target.value)}
              />
              <TextField
                label="Body Price"
                fullWidth
                margin="normal"
                value={bodyPrice}
                onChange={(e) => setBodyPrice(e.target.value)}
              />
              <TextField
                label="Sleeves Price"
                fullWidth
                margin="normal"
                value={sleevesPrice}
                onChange={(e) => setSleevesPrice(e.target.value)}
              />
              <TextField
                label="Material Parent"
                fullWidth
                margin="normal"
                value={matParent}
                onChange={(e) => setMatParent(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                {selectedMaterial ? 'Update' : 'Save'}
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

        <Grid item xs={12}>
          <Typography variant="h5">Material List</Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Material;

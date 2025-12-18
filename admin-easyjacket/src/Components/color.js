import React, { useEffect, useState } from 'react';
import instance from '../constant/instance';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListItemText,

} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Colors = () => {
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [parts, setParts] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', code: '', isActive: false, materials: [], parts: [] });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchColors();
    fetchMaterials();
    fetchParts();
  }, []);

  const fetchColors = async () => {
    const response = await instance.get('/property/colors');
    setColors(response.data.data);
  };

  const fetchMaterials = async () => {
    
    const {data }= await instance.get('/property/materials');
    
    setMaterials(data.materials);
  };

  const fetchParts = async () => {
    const response = await instance.get('/property/parts');
    setParts(response.data.data);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({ id: '', name: '', code: '', isActive: false, materials: [], parts: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await instance.put(`/property/colors/${formData._id}`, formData);
    } else {
      await instance.post('/property/colors', formData);
    }
    fetchColors();
    handleClose();
  };

  const handleEdit = (color) => {
    setFormData(color);
    setEditMode(true);
    handleShow();
  };

  const handleDelete = async (id) => {
    await instance.delete(`/property/colors/${id}`);
    fetchColors();
  };

 

  return (
    <Box>
      <h2>Color List</h2>
      <Button variant="contained" color="primary" onClick={handleShow}>Add Color</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colors.map((color) => (
              <TableRow key={color._id}>
                <TableCell>{color.id}</TableCell>
                <TableCell>{color.name}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: color.code,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      display: 'inline-block',
                    }}
                  ></Box>
                </TableCell>
                <TableCell>
                  <Checkbox checked={color.isActive} disabled />
                </TableCell>
                <TableCell>
                  <IconButton color="warning" onClick={() => handleEdit(color)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(color._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Color' : 'Add Color'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="ID"
              fullWidth
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Color Code"
              fullWidth
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
           <FormControl fullWidth margin="dense">
  <InputLabel>Materials</InputLabel>
  <Select
    multiple
    value={formData.materials}
    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
    renderValue={(selected) => selected.join(', ')}
  >
    {materials && materials.map((material) => (
      <MenuItem key={material._id} value={material.name}>
        <Checkbox checked={formData.materials.indexOf(material.name) > -1} />
        <ListItemText primary={material.name} />
      </MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl fullWidth margin="dense">
  <InputLabel>Parts</InputLabel>
  <Select
    multiple
    value={formData.parts}
    onChange={(e) => setFormData({ ...formData, parts: e.target.value })}
    renderValue={(selected) => selected.join(', ')}
  >
    {parts && parts.map((part) => (
      <MenuItem key={part._id} value={part.name}>
        <Checkbox checked={formData.parts.indexOf(part.name) > -1} />
        <ListItemText primary={part.name} />
      </MenuItem>
    ))}
  </Select>
</FormControl>

            <Checkbox
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />{' '}
            Is Active
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button type="submit" color="primary">{editMode ? 'Update' : 'Add'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Colors;

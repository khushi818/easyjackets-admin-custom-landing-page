import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from '@mui/material';
import fileInstance from '../constant/filesInstance';
import instance from '../constant/instance';
import Editor  from 'react-simple-wysiwyg';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await instance.get('/features/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('author', formData.author);
    if (imageFile) form.append('image', imageFile);

    try {
      if (editMode) {
        await fileInstance.put(`/features/blogs/${selectedBlogId}`, form);
      } else {
        await fileInstance.post('/features/blogs', form);
      }
      setFormData({ title: '', content: '', author: '' });
      setImageFile(null);
      setEditMode(false);
      setOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditMode(true);
    setSelectedBlogId(blog._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/features/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting the blog', error);
    }
  };

  const handleOpen = () => {
    setFormData({ title: '', content: '', author: '' });
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {editMode ? 'Edit Blog' : 'Add Blog'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Blog' : 'Add Blog'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
          />
          <Editor
            name="content"
            label="Content"
           
            value={formData.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            fullWidth
            value={formData.author}
            onChange={handleInputChange}
          />
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100px', height: 'auto' }} />}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(blog)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(blog._id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogManager;

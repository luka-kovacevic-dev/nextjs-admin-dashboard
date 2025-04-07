import React from 'react';
import { useState, useEffect } from 'react';

import axios from "axios";

import { Box, Modal, FormControl, InputLabel, Input, Button, FormHelperText } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://worker-proxy-server.lukakovacevic0100.workers.dev/api/posts/luka/testimonials"
      );

      setItems(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleAdd = async () => {
    if (quote === '' || author === '' || role === '' || company === '' || image === '') {
      console.log('Must fill the box');
      return;
    }

    try {
      const response = await axios.post(
        "https://worker-proxy-server.lukakovacevic0100.workers.dev/api/posts/luka/testimonials",
        {
          quote,
          author,
          role,
          company,
          image
        }
      );

      console.log("Add success");
      setOpen(false);
      fetchTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://worker-proxy-server.lukakovacevic0100.workers.dev/api/posts/luka/testimonials/${id}`
      );

      console.log("Remove success");
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonials:", error);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard Content</h2>
      <div className="container mt-5">
        {/* Table header with Add button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Testimonials</h2>
          <button
            className="btn btn-primary"
            onClick={handleOpen}
          >
            <i className="bi bi-plus-circle me-2"></i>Add New
          </button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth margin='normal' required>
              <InputLabel htmlFor="quote">Quote</InputLabel>
              <Input id="quote" name="quote" value={quote} onChange={(e) => setQuote(e.target.value)} multiline />
            </FormControl>

            <FormControl fullWidth margin='normal' required>
              <InputLabel htmlFor="author">Author</InputLabel>
              <Input id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </FormControl>

            <FormControl fullWidth margin='normal' required>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Input id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
            </FormControl>

            <FormControl fullWidth margin='normal' required>
              <InputLabel htmlFor="company">Company</InputLabel>
              <Input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </FormControl>

            <FormControl fullWidth margin='normal' required>
              <InputLabel htmlFor="image-url">Image URL</InputLabel>
              <Input id="image-url" name="image-url" value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>

            <Button variant="contained" color="success" onClick={handleAdd}>Add</Button>
          </Box>
        </Modal>

        {/* Styled table */}
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-4">ID</th>
                  <th scope="col">Quote</th>
                  <th scope="col">Author</th>
                  <th scope="col">Role</th>
                  <th scope="col">Company</th>
                  <th scope="col">Image URL</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4 fw-semibold">{item.id}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }} title={item.quote}>
                      {item.quote}
                    </td>
                    <td>{item.author}</td>
                    <td>{item.role}</td>
                    <td>{item.company}</td>
                    <td>{item.image}</td>
                    <td className="text-end pe-4">
                      <div className="btn-group btn-group-sm">
                        {/* <button
                          className="btn btn-outline-primary"
                          onClick={() => console.log('Edit item', item.id)}
                        >
                          <i className="bi bi-pencil-square me-1"></i>Edit
                        </button> */}
                        <button
                          className="btn btn-outline-danger ms-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
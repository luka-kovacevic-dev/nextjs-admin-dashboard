import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Modal, FormControl, InputLabel, Input, Button } from '@mui/material';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ quote: '', author: '', role: '', company: '', image: '' });

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get("https://worker-proxy-server.lukakovacevic0100.workers.dev/api/posts/luka/testimonials");
      setItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleAdd = async () => {
    if (Object.values(form).some(v => !v)) {
      console.log('All fields required');
      return;
    }
    try {
      await axios.post("https://worker-proxy-server.lukakovacevic0100.workers.dev/api/posts/luka/testimonials", form);
      setOpen(false);
      setForm({ quote: '', author: '', role: '', company: '', image: '' });
      fetchTestimonials();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://worker-proxy-server.lukakovacevic0100.workers.dev/api/posts/luka/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard Content</h2>
      <div style={{ marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Testimonials</h2>
          <button onClick={() => setOpen(true)} style={{ padding: '0.375rem 0.75rem' }}>Add New</button>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
            {Object.keys(form).map((key) => (
              <FormControl key={key} fullWidth margin='normal' required>
                <InputLabel htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                <Input id={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} multiline={key === 'quote'} />
              </FormControl>
            ))}
            <Button variant="contained" onClick={handleAdd} style={{ marginTop: '1rem' }}>Add</Button>
          </Box>
        </Modal>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['ID', 'Quote', 'Author', 'Role', 'Company', 'Image URL', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '0.75rem' }}>{item.id}</td>
                  <td style={{ padding: '0.75rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.quote}</td>
                  <td style={{ padding: '0.75rem' }}>{item.author}</td>
                  <td style={{ padding: '0.75rem' }}>{item.role}</td>
                  <td style={{ padding: '0.75rem' }}>{item.company}</td>
                  <td style={{ padding: '0.75rem' }}>{item.image}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(item.id)} style={{ padding: '0.25rem 0.5rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// Setup
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

// Add support for incoming JSON entities
app.use(cors());
app.use(express.json())

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Get all
app.get('/api/items', (req, res) => {
  res.json({ message: 'fetch all items' });
});

// Get one
app.get('/api/items/:itemId', (req, res) => {
  res.json({ message: `get user with identifier: ${req.params.id}` });
});

// Add new
// This route expects a JSON object in the body, e.g. { "firstName": "Peter", "lastName": "McIntyre" }
app.post('/api/items', (req, res) => {
  // MUST return HTTP 201
  res.status(201).json({ message: `added a new item: ${req.body.firstName} ${req.body.lastName}` });
});

// Edit existing
// This route expects a JSON object in the body, e.g. { "id": 123, "firstName": "Peter", "lastName": "McIntyre" }
app.put('/api/items/:id', (req, res) => {
  res.json({
    message: `updated item with identifier: ${req.params.id} to ${req.body.firstName} ${req.body.lastName}`,
  });
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  res.status(200).json({ message: `deleted user with identifier: ${req.params.id}` });
});

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send('Resource not found');
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
  console.log('Ready to handle requests on port ' + HTTP_PORT);
});
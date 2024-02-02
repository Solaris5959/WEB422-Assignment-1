/********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Connor McDonald Student ID: 136123221 Date: 2/2/2024
*
* Published URL: https://good-cyan-moose-veil.cyclic.app/
*********************************************************************************/

// Setup
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const ListingsDB = require('./modules/listingsDB.js');
const app = express();
const db = new ListingsDB();
const HTTP_PORT = process.env.PORT || 8080;

// Add support for incoming JSON entities
app.use(cors());
app.use(express.json())

// init db module
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

// POST /api/listings
app.post('/api/listings', (req, res) => {
  db.addNewListing(req.body).then((data) => {
    res.status(201).json(data);
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
});

// GET /api/listings
app.get('/api/listings', (req, res) => {
    db.getAllListings(req.query.page, req.query.perPage, req.query.name).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
    }
);

// GET /api/listings/:id
app.get('/api/listings/:id', (req, res) => {
    db.getListingById(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
}
);

// PUT /api/listings/:id
app.put('/api/listings/:id', (req, res) => {
    db.updateListingById(req.body, req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
}
);

// DELETE /api/listings/:id
app.delete('/api/listings/:id', (req, res) => {
    db.deleteListingById(req.params.id).then(() => {
        res.status(204).send();
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
}
);

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send('Resource not found');
});
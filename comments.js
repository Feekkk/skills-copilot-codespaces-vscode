// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment'); // Import the Comment model        
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'commentsDB'; // Database name
const collectionName = 'comments'; // Collection name
const port = 3000; // Port number
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });     

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);
// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));
// Middleware to enable CORS
app.use(cors());
// Middleware to serve static files
app.use(express.static('public'));
// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
// Middleware to handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Middleware to handle 400 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send('Bad Request');
});
// Middleware to handle 401 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthorized');
});
// Middleware to handle 403 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(403).send('Forbidden');
});

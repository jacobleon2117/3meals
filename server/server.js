const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000; // Port number

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// MongoDB
mongoose.connect('mongodb+srv://jacobleon2117:sperryOK2117!@dev-cluster.xjrjri1.mongodb.net/', {
 useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(() => {
 console.log('Connected to MongoDB');
})
.catch((err) => {
 console.error('Error connecting to MongoDB:', err.message);
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Edamam API credentials
const edamamAppId = '24040aba';
const edamamAppKey = 'ab7ab802935cabc9918ec92b78f40c4d';

// Route to fetch recipes from Edamam
app.get('/api/recipes', async (req, res) => {
    const query = req.query.q; // Get the search query from the request
    const url = `https://api.edamam.com/search?q=${query}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;

    try {
        const fetch = (await import('node-fetch')).default; // dynamic import
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); // Send the data back to the client
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Error fetching recipes. Please try again.');
    }
});

// Start the server
app.listen(port, () => {
 console.log(`Server is listening at http://localhost:${port}`);
});

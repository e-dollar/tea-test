// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const recipeManager = require('./recipeManager');

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Define routes
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Authenticate user
        const user = await recipeManager.authenticateUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // Register new user
        const newUser = await recipeManager.registerUser(username, password, email);
        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/recipes', async (req, res) => {
    try {
        // Fetch recipes
        const recipes = await recipeManager.getRecipes();
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

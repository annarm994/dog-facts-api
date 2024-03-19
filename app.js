const express = require('express');
const app = express();
const dogFacts = require('./dog_facts');

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint for retrieving dog facts
app.get('/facts', (req, res) => {
    const number = parseInt(req.query.number);
    const facts = number ? dogFacts.slice(0, number) : dogFacts;
    res.json({ facts: facts, success: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
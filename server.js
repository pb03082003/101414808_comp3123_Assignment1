const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 
const employeeRoutes = require('./routes/employee'); 


// Initialize Express App
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the routes for handling requests
app.use('/api/v1/user', userRoutes); // For user management (signup, login)
app.use('/api/v1/emp', employeeRoutes); // For employee management

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/comp3123_assigment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Set up the server to listen on a port (default to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

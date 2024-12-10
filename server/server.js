const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Import routes
const userRoutes = require('./routes/user');
const loginUser = require('./routes/user');
const orderRoutes = require('./routes/order');


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Routes
app.use('/api/user', userRoutes);
app.use('api/user', loginUser);
app.use('/api/orders', orderRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Server');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
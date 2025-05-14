import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';
import radioClicksRouter from './routes/radioClicks.js';
import feedbackRouter from './routes/feedback.js';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://irini-niko.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(uri)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit if we can't connect to the database
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/radio-clicks', radioClicksRouter);
app.use('/api/feedback', feedbackRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        details: err.message
    });
});

// 404 handler
app.use((req, res) => {
    console.log('❌ Route not found:', req.method, req.url);
    res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

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

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(uri)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/radio-clicks', radioClicksRouter);
app.use('/api/feedback', feedbackRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

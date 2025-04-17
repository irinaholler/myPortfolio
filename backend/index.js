const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Routes
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');
const adminRouter = require('./routes/admin');
const radioClicksRouter = require('./routes/radioClicks');
const feedbackRouter = require('./routes/feedback');

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/radio-clicks', radioClicksRouter);
app.use('/api/feedback', feedbackRouter);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 
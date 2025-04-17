const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const auth = require('../middleware/auth');

// Register new admin
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create new admin
        const admin = new Admin({
            username,
            password
        });

        await admin.save();

        // Create token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login admin
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get admin profile
router.get('/profile', auth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 
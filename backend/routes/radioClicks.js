import express from 'express';
import RadioClick from '../models/radioClick.model.js';

const router = express.Router();

// Record a radio button click
router.post('/track', (req, res) => {
    const { buttonId, clickedBy } = req.body;
    console.log('📩 Received click:', req.body);

    const newClick = new RadioClick({
        buttonId,
        clickedBy
    });

    newClick.save()
        .then(() => res.json('Click recorded successfully!'))
        .catch(err => {
            console.error('MongoDB Save Error:', err);
            res.status(400).json('Error: ' + err);
        });
});

// Get all clicks
router.get('/', (req, res) => {
    RadioClick.find()
        .sort({ timestamp: -1 })
        .then(clicks => res.json(clicks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get clicks for a specific button
router.get('/button/:buttonId', (req, res) => {
    RadioClick.find({ buttonId: req.params.buttonId })
        .sort({ timestamp: -1 })
        .then(clicks => res.json(clicks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get clicks by a specific user
router.get('/user/:clickedBy', (req, res) => {
    RadioClick.find({ clickedBy: req.params.clickedBy })
        .sort({ timestamp: -1 })
        .then(clicks => res.json(clicks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get total click count
router.get('/count', async (req, res) => {
    try {
        const totalClicks = await RadioClick.countDocuments();
        res.json({ totalClicks });
    } catch (err) {
        res.status(500).json({ error: 'Failed to count clicks' });
    }
});

router.get('/count-unique-users', async (req, res) => {
    try {
        const uniqueUsers = await RadioClick.distinct('clickedBy');
        console.log("👥 Unique users:", uniqueUsers);
        res.json({ totalUsers: uniqueUsers.length });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get unique user count' });
    }
});

// Get total clicks for a button
router.get('/count/button/:buttonId', async (req, res) => {
    try {
        const count = await RadioClick.countDocuments({ buttonId: req.params.buttonId });
        res.json({ buttonId: req.params.buttonId, count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to count clicks for button' });
    }
});


export default router;

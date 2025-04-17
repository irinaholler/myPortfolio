const router = require('express').Router();
const RadioClick = require('../models/radioClick.model');
const auth = require('../middleware/auth');

// Record a radio button click
router.post('/track', (req, res) => {
    const { buttonId, clickedBy } = req.body;

    const newClick = new RadioClick({
        buttonId,
        clickedBy
    });

    newClick.save()
        .then(() => res.json('Click recorded successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all clicks (admin only)
router.get('/', auth, (req, res) => {
    RadioClick.find()
        .sort({ timestamp: -1 })
        .then(clicks => res.json(clicks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get clicks for a specific button (admin only)
router.get('/button/:buttonId', auth, (req, res) => {
    RadioClick.find({ buttonId: req.params.buttonId })
        .sort({ timestamp: -1 })
        .then(clicks => res.json(clicks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get clicks by a specific user (admin only)
router.get('/user/:clickedBy', auth, (req, res) => {
    RadioClick.find({ clickedBy: req.params.clickedBy })
        .sort({ timestamp: -1 })
        .then(clicks => res.json(clicks))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
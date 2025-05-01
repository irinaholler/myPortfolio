import express from 'express';
import RadioClick from '../models/radioClick.model.js';

const router = express.Router();

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

export default router;

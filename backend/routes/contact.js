import express from 'express';
import Contact from '../models/contact.model.js';

const router = express.Router();

// Submit contact form (public)
router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.json('Message sent successfully!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all messages (public – consider restricting later)
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get specific message by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Message not found' });
        res.json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update message status (optional – keep only if needed)
router.post('/update/:id', async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Message not found' });

        message.status = req.body.status;
        await message.save();

        res.json('Message status updated!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete message (optional – keep only if necessary)
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json('Message deleted.');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;

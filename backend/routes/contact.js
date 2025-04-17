const router = require('express').Router();
let Contact = require('../models/contact.model');
const auth = require('../middleware/auth');

// Submit contact form
router.route('/submit').post((req, res) => {
    const { name, email, message } = req.body;

    const newContact = new Contact({
        name,
        email,
        message
    });

    newContact.save()
        .then(() => res.json('Message sent successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all messages (admin only)
router.route('/').get(auth, (req, res) => {
    Contact.find()
        .sort({ createdAt: -1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get specific message (admin only)
router.route('/:id').get(auth, (req, res) => {
    Contact.findById(req.params.id)
        .then(message => res.json(message))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update message status (admin only)
router.route('/update/:id').post(auth, (req, res) => {
    Contact.findById(req.params.id)
        .then(message => {
            message.status = req.body.status;
            message.save()
                .then(() => res.json('Message status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete message (admin only)
router.route('/:id').delete(auth, (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.json('Message deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
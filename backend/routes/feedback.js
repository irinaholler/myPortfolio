const router = require('express').Router();
const Feedback = require('../models/feedback.model');
const auth = require('../middleware/auth');

// Submit feedback
router.post('/submit', (req, res) => {
    const { design, content, navigation, overall } = req.body;

    // Get user identifier from request or generate a new one
    const userIdentifier = req.body.userIdentifier || `user_${Math.random().toString(36).substring(2, 15)}`;

    const newFeedback = new Feedback({
        design,
        content,
        navigation,
        overall,
        submittedBy: userIdentifier
    });

    newFeedback.save()
        .then(() => res.json({
            message: 'Feedback submitted successfully!',
            userIdentifier
        }))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all feedback (admin only)
router.get('/', auth, (req, res) => {
    Feedback.find()
        .sort({ createdAt: -1 })
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get feedback summary (admin only)
router.get('/summary', auth, (req, res) => {
    Feedback.aggregate([
        {
            $group: {
                _id: null,
                avgDesign: { $avg: { $toDouble: "$design" } },
                avgContent: { $avg: { $toDouble: "$content" } },
                avgNavigation: { $avg: { $toDouble: "$navigation" } },
                avgOverall: { $avg: { $toDouble: "$overall" } },
                totalResponses: { $sum: 1 }
            }
        }
    ])
        .then(summary => {
            if (summary.length === 0) {
                return res.json({
                    avgDesign: 0,
                    avgContent: 0,
                    avgNavigation: 0,
                    avgOverall: 0,
                    totalResponses: 0
                });
            }
            res.json(summary[0]);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
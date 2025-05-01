import express from 'express';
import Feedback from '../models/feedback.model.js';

const router = express.Router();

// Submit feedback (public)
router.post('/submit', async (req, res) => {
    try {
        const { design, content, navigation, overall, userIdentifier } = req.body;

        const identifier = userIdentifier || `user_${Math.random().toString(36).substring(2, 15)}`;

        const newFeedback = new Feedback({
            design,
            content,
            navigation,
            overall,
            submittedBy: identifier
        });

        await newFeedback.save();
        res.json({
            message: 'Feedback submitted successfully!',
            userIdentifier: identifier
        });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(400).json({ error: 'Failed to submit feedback' });
    }
});

// Get all feedback (public)
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedback);
    } catch (err) {
        console.error('Error fetching feedback:', err);
        res.status(400).json({ error: 'Failed to fetch feedback' });
    }
});

// Get feedback summary (public)
router.get('/summary', async (req, res) => {
    try {
        const summary = await Feedback.aggregate([
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
        ]);

        if (!summary.length) {
            return res.json({
                avgDesign: 0,
                avgContent: 0,
                avgNavigation: 0,
                avgOverall: 0,
                totalResponses: 0
            });
        }

        res.json(summary[0]);
    } catch (err) {
        console.error('Error generating feedback summary:', err);
        res.status(400).json({ error: 'Failed to generate summary' });
    }
});

export default router;
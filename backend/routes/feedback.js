import express from 'express';
import Feedback from '../models/feedback.model.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FEEDBACK_NOTIFY_EMAIL,
        pass: process.env.FEEDBACK_NOTIFY_PASS,
    },
});

// Helper: send email notification
const sendNotificationEmail = async (feedbackData) => {
    const mailOptions = {
        from: `"Feedback Bot" <${process.env.FEEDBACK_NOTIFY_EMAIL}>`,
        to: process.env.FEEDBACK_NOTIFY_EMAIL,
        subject: '📩 New Portfolio Feedback Received',
        html: `
      <h3>New Feedback Submitted</h3>
      <p><strong>Name:</strong> ${feedbackData.name || 'Anonymous'}</p>
      <p><strong>Email:</strong> ${feedbackData.email || 'Not provided'}</p>
      <p><strong>Design:</strong> ${feedbackData.design}</p>
      <p><strong>Content:</strong> ${feedbackData.content}</p>
      <p><strong>Navigation:</strong> ${feedbackData.navigation}</p>
      <p><strong>Overall:</strong> ${feedbackData.overall}</p>
      <p><strong>Comments:</strong> ${feedbackData.comments || 'None'}</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};

// Submit feedback
router.post('/submit', async (req, res) => {
    try {
        const {
            name,
            email,
            comments,
            design,
            content,
            navigation,
            overall,
            userIdentifier,
        } = req.body;

        const identifier = userIdentifier || `user_${Math.random().toString(36).substring(2, 15)}`;

        const newFeedback = new Feedback({
            name,
            email,
            comments,
            design,
            content,
            navigation,
            overall,
            submittedBy: identifier,
        });

        await newFeedback.save();
        await sendNotificationEmail(req.body);

        res.json({
            message: 'Feedback submitted successfully!',
            userIdentifier: identifier,
        });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(400).json({ error: 'Failed to submit feedback' });
    }
});

// Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedback);
    } catch (err) {
        console.error('Error fetching feedback:', err);
        res.status(400).json({ error: 'Failed to fetch feedback' });
    }
});

// Get summary
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
        console.error('Error generating summary:', err);
        res.status(400).json({ error: 'Failed to generate summary' });
    }
});

export default router;

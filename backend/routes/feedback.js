import express from 'express';
import Feedback from '../models/feedback.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/submit', async (req, res) => {
    console.log('🔔 Feedback submission hit');
    console.log('📦 Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('📦 Raw request body:', JSON.stringify(req.body, null, 2));

    try {
        const {
            name = '',
            email = '',
            comments = '',
            design,
            content,
            navigation,
            overall,
            userIdentifier
        } = req.body;

        console.log('Received values:', JSON.stringify({
            design: { value: design, type: typeof design },
            content: { value: content, type: typeof content },
            navigation: { value: navigation, type: typeof navigation },
            overall: { value: overall, type: typeof overall }
        }, null, 2));

        if (design === undefined || content === undefined || navigation === undefined || overall === undefined) {
            return res.status(400).json({
                error: 'Missing rating values',
                details: 'Please provide ratings for all categories',
                received: { design, content, navigation, overall }
            });
        }

        const ratings = {
            design: Number(design),
            content: Number(content),
            navigation: Number(navigation),
            overall: Number(overall)
        };

        const invalidRatings = Object.entries(ratings).filter(([key, value]) =>
            isNaN(value) || value < 1 || value > 5
        );

        if (invalidRatings.length > 0) {
            return res.status(400).json({
                error: 'Invalid rating values',
                details: 'Ratings must be numbers between 1 and 5',
                received: ratings,
                invalid: invalidRatings
            });
        }

        try {
            const newFeedback = new Feedback({
                name,
                email,
                comments,
                design: ratings.design,
                content: ratings.content,
                navigation: ratings.navigation,
                overall: ratings.overall,
                submittedBy: userIdentifier || `user_${Math.random().toString(36).substring(2, 15)}`,
            });

            const validationError = newFeedback.validateSync();
            if (validationError) {
                return res.status(400).json({
                    error: 'Validation Error',
                    details: Object.values(validationError.errors).map(err => err.message).join(', ')
                });
            }

            await newFeedback.save();
            console.log('✅ Feedback saved successfully');

            // ✅ Send email notification
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.FEEDBACK_NOTIFY_EMAIL,
                    pass: process.env.FEEDBACK_NOTIFY_PASS
                }
            });

            const mailOptions = {
                from: process.env.FEEDBACK_NOTIFY_EMAIL,
                to: process.env.FEEDBACK_NOTIFY_EMAIL,
                subject: '📬 New Portfolio Feedback Received',
                text: `Design: ${ratings.design}\nContent: ${ratings.content}\nNavigation: ${ratings.navigation}\nOverall: ${ratings.overall}\nName: ${name}\nEmail: ${email}\nComments: ${comments}`
            };

            await transporter.sendMail(mailOptions);
            console.log('📧 Feedback notification email sent');

            res.json({
                success: true,
                message: 'Feedback submitted successfully!',
                data: newFeedback
            });
        } catch (saveError) {
            console.error('❌ Error saving feedback:', saveError);

            if (saveError.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    details: Object.values(saveError.errors).map(err => err.message).join(', ')
                });
            }

            if (saveError.code === 11000) {
                return res.status(400).json({
                    error: 'Duplicate Entry',
                    details: 'A feedback entry with this information already exists'
                });
            }

            return res.status(400).json({
                success: false,
                error: 'Failed to save feedback',
                details: saveError.message
            });
        }
    } catch (err) {
        console.error('❌ Error in POST /submit:', err.message);
        res.status(500).json({
            error: 'Failed to submit feedback',
            details: err.message
        });
    }
});

export default router;

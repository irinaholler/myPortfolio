import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        comments: {
            type: String,
        },
        design: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        content: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        navigation: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        overall: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        submittedBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add pre-save middleware to validate ratings
feedbackSchema.pre('save', function (next) {
    const ratings = ['design', 'content', 'navigation', 'overall'];
    for (const rating of ratings) {
        if (this[rating] < 1 || this[rating] > 5) {
            next(new Error(`${rating} rating must be between 1 and 5`));
            return;
        }
    }
    next();
});

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;

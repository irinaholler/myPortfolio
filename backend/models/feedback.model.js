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
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        navigation: {
            type: String,
            required: true,
        },
        overall: {
            type: String,
            required: true,
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

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;

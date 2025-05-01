import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'unread',
        },
    },
    { timestamps: true }
);

const Contact = model('Contact', contactSchema);

export default Contact;

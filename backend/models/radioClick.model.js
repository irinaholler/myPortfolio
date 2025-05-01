import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const radioClickSchema = new Schema(
    {
        buttonId: {
            type: String,
            required: true,
        },
        clickedBy: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const RadioClick = model('RadioClick', radioClickSchema);

export default RadioClick;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    design: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    navigation: {
        type: String,
        required: true
    },
    overall: {
        type: String,
        required: true
    },
    submittedBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback; 
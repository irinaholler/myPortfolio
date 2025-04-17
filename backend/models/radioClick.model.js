const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const radioClickSchema = new Schema({
    buttonId: {
        type: String,
        required: true
    },
    clickedBy: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const RadioClick = mongoose.model('RadioClick', radioClickSchema);

module.exports = RadioClick; 
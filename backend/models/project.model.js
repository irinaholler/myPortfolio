const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    liveUrl: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 
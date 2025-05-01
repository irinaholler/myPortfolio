import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const projectSchema = new Schema(
    {
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
    },
    {
        timestamps: true
    }
);

const Project = model('Project', projectSchema);

export default Project;

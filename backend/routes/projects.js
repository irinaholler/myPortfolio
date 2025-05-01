import express from 'express';
import Project from '../models/project.model.js';

const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get featured projects
router.get('/featured', (req, res) => {
    Project.find({ featured: true })
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new project (public now — be careful!)
router.post('/add', (req, res) => {
    const { title, description, technologies, imageUrl, githubUrl, liveUrl, featured } = req.body;

    const newProject = new Project({
        title,
        description,
        technologies,
        imageUrl,
        githubUrl,
        liveUrl,
        featured
    });

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get specific project by ID
router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete project by ID (public)
router.delete('/:id', (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update project by ID (public)
router.post('/update/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => {
            project.title = req.body.title;
            project.description = req.body.description;
            project.technologies = req.body.technologies;
            project.imageUrl = req.body.imageUrl;
            project.githubUrl = req.body.githubUrl;
            project.liveUrl = req.body.liveUrl;
            project.featured = req.body.featured;

            project.save()
                .then(() => res.json('Project updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;

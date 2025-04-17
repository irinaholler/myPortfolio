const router = require('express').Router();
let Project = require('../models/project.model');
const auth = require('../middleware/auth');

// Get all projects
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get featured projects
router.route('/featured').get((req, res) => {
    Project.find({ featured: true })
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new project (admin only)
router.route('/add').post(auth, (req, res) => {
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

// Get specific project
router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete project (admin only)
router.route('/:id').delete(auth, (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update project (admin only)
router.route('/update/:id').post(auth, (req, res) => {
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

module.exports = router; 
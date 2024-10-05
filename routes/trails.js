const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Trail = require('../models/Trail');
const { isAuthenticated } = require('../middleware/auth');

// multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +
    path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Index route
router.get('/', async (req, res) => {
    try {
        const trails = await Trail.find({});
        res.render('trails/index', { trails });
    } catch (error) {
        res.status(500).send('Error fetching trails');
    }
});

//New Route to show form to create new trail
router.get('/new', (req, res) => {
    res.render('trails/new');
});

// Create Route
router.post('/', isAuthenticated,
    upload.single('image'), async (req, res) => {
    try {
        const trail = new Trail(req.body.trail);
        trail.image = req.file ? `/uploads/${req.file.filename}` : '';
        trail.user_id = req.user._id; //Assuming user is authenticated
        await trail.save();
        res.redirect('/trails');
    } catch (error) {
        res.status(400).send('Error creating trail');
    }
});

//Show route
router.get('/:id', async (req, res) => {
    try {
        const trail = await
Trail.findById(req.params.id).populate('user_id');
        res.render('trails/show', { trail });            
    } catch (erro) {
        res.status(500).send('Error fetching trail details');
    }
});

// Edit Route - Show form to edit trail
router.get('/:id/edit', async (req, res) => {
    try {
        const trail = await Trail.findById(req.params.id);
        res.render('trails/edit', { trail });
    } catch (error) {
        res.status(500).send('Error fetching trail for editing');
    }
});

//Update Route
router.put('/:id', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const trail = await trail.findById(req.params.id);
        if (req.file) {
            trail.image = `/uploads/${req.file.filename}`;
        }
        Object.assign(trail, req.body.trail);
        await trail.save();
        res.redirect(`/trails/${req.params.id}`);
    } catch (error) {
        res.status(400).send('Error updating trail');
    }
});

//Delete Route
router.delete('/:id', async (req, res) => {
    try {
        await Trail.findByIdAndDelete(req.params.id);
        res.redirect('/trails');
    } catch (error) {
        res.status(500).send('Error deleting trail');
    }
});

module.exports = router;
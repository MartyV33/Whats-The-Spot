const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Trail = require('../models/Trail');
const { isAuthenticated } = require('../middleware/auth');

// Save Trail Route
router.post('/save-trail/:id', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.savedTrails.push(req.params.id);
        await user.save();
        res.redirect('/trails/' + req.params.id);
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});
// Deleting Trail Route
router.post('/delete-trail/:id', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.savedTrails.pull(req.params.id);
        await user.save();
        res.redirect('/user');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
})
// User Profile Route
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedTrails');
        console.log(user.savedTrails);
        res.render('user/profile', { user });
    } catch (error) {
        res.status(500).send('Error fetching user profile');
    }
});

module.exports = router;
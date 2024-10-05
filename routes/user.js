const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { isAuthenticated } = require('../middleware/auth');

// User Profile Route
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const user = await
User.findById(req.user._id);
        res.render('user/profile', { user });
    } catch (error) {
        res.status(500).send('Error fetching user profile');
    }
});

module.exports = router;
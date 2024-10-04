const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Trail = mongoose.model('Trail', trailSchema);
module.exports = trail;
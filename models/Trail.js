const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    image: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Trail = mongoose.model('Trail', trailSchema);
module.exports = Trail;
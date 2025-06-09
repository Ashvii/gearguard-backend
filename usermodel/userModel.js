const mongoose = require('mongoose');

// Create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: 'gearguard user'
    }
});

const users = mongoose.model("users", userSchema);
module.exports = users;

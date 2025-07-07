// Import mongoose
const mongoose = require('mongoose');

// Define the job schema
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jtype: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Create the model
const jobs = mongoose.model('jobs', jobSchema);

// Export the model
module.exports = jobs;

const mongoose = require('mongoose');

// Create schema
const breakdownSchema = new mongoose.Schema({
    
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
 
});

const breakdown = mongoose.model("complaint", breakdownSchema);
module.exports = breakdown;

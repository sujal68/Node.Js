const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Status: {
        type: Boolean,
        default: true
    },
    Created_date: {
        type: String
    },
    Updated_date: {
        type: String
    }
});

const model = mongoose.model("User", schema);
module.exports = model;
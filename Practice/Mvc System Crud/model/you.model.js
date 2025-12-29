const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Thumnail: {
        type: String,
        required: true,
    },
    Duration: {
        type: String,
        required: true,
    },
    Profile: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Channel: {
        type: String,
        required: true,
    },
    Views: {
        type: String,
        required: true,
    },
});

const model = mongoose.model("Youtube", schema);

module.exports = model;
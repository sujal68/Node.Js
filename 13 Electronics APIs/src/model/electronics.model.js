const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Electronics_Store', electronicsSchema, 'electronics');
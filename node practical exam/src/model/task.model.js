const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    createAt: {
        type: String,
        required: true,
    },
    updateAt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Task", taskSchema, "task");
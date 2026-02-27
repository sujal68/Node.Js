const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    status: { type: Boolean, default: true },
    created_date: String,
    updated_date: String
});

module.exports = mongoose.model("Admin", adminSchema);
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Youtube-video-crud";

mongoose.connect(url).then(() => {
    console.log("MongoDB Connected✅");
}).catch((err) => {
    console.log("MongoDB Connection Failed❌", err);
})
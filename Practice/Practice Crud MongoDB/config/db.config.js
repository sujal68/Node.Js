const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/LinkedIn-Post";

mongoose.connect(URL).then(() => {
    console.log("MongoDB Connected 😁 😄 ✅");
}).catch((error) => {
    console.log("MongoDB Connection failed 🥲 😣 ❌", error);
})
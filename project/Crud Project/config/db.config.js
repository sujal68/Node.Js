const mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017/Music-Opretion';

mongoose.connect(URL).then(() => {
    console.log("MongoDB Connected... 😄😄");
}).catch((error) => {
    console.log("MongoDB Is Not Connected.. 🥲", error);
})
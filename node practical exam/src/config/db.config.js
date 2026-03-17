const mongoose = require('mongoose');

mongoose.connect(process.env.db_Url).then(() => {
    console.log("Database Is Connected...");
}).catch((err) => {
    console.log("Database Connection failed..", err);
})
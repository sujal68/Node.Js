const express = require("express");
const app = express();
const port = 6800;

app.set('view engine', 'ejs')

// jump middelware for jumping index.js 
app.use('/', require('./routes/index'))

app.listen(port, (error) => {
    if (error) {
        console.log("Server Is Not Started!!!!", error);
        return false;
    }
    console.log('Server Is Started In This Port http://localhost:6800');
})
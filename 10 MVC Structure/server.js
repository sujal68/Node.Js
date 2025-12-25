const express = require('express');
const app = express();
const PORT = 6800;

app.set('view engine', 'ejs')

app.use('/', require('./routes/index.js'))

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Is Not Started...😣");
        return false;
    }
    console.log("Server Is Started 😄 http://localhost:6800");
})
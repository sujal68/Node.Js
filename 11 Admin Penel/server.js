const express = require('express');
const app = express();
const port = 6800;

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));

app.use('/', require('./routes/'))

app.listen(port, (err) => {
    if (err) {
        console.log("Server Is NOt Started");
        return false;
    }

    console.log("Server Started Successfully In This Port http://localhost:6800");
})
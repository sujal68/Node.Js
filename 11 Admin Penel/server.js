const express = require('express');
require('./config/db.config')
const app = express();
const port = 6800;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', require('./routes/'))

app.listen(port, (err) => {
    if (err) {
        console.log("Server Is NOt Started");
        return false;
    }

    console.log("Server Started Successfully In This Port http://localhost:6800");
})
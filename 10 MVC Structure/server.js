const express = require('express');
require('./config/db.config.js');
const path = require('path');
const app = express();
const PORT = 6800;

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.use('/', require('./routes/index.js'))
app.use('/form', require('./routes/Emp.routes.js'))

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Is Not Started...😣");
        return false;
    }
    console.log("Server Is Started 😄 http://localhost:6800");
})
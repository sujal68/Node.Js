require('dotenv').config();
require('./config/db.config')
const express = require('express');
const app = express();
const PORT = 6800;

app.use(express.urlencoded());
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Connection failed...");
        return false;
    }
    console.log("Server Is Started...");
})
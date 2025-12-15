require('./config/db.consig')
const express = require('express');
const app = express();
const PORT = 6800;

app.set('view engine', "ejs")

app.get('/', (req, res) => {
    return res.render('index')
})

app.listen(PORT, (error) => {
    if (error) {
        console.log("Server Is Not Connected!!", error);
        return false;
    }
    console.log("Server Is Started In This Port https://localhost:6800");

})
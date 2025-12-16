const book = require('./model/book.model')
require('./config/db.consig')
const express = require('express');
const app = express();
const PORT = 6800;

app.set('view engine', "ejs")

// middle were 
app.use(express.urlencoded());

app.get('/', (req, res) => {
    return res.render('form')
})

app.post('/addBook', (req, res) => {
    console.log(req.body);

    book.create(req.body).then(() => {
        console.log("Inserted Is Successfully Done");
    }).catch((error) => {
        console.log("Inserted IS Failed!!!", error);
    })

    return res.redirect('/');
})

app.listen(PORT, (error) => {
    if (error) {
        console.log("Server Is Not Connected!!", error);
        return false;
    }
    console.log("Server Is Started In This Port https://localhost:6800");

})
const express = require('express');
const app = express();
const port = 6800;

app.set('view engine', 'ejs')
app.use('/', express.static('public'));


app.get('/', (req, res) => {
    res.render('ageCheck');
});

const middleware = (req, res, next) => {

    if (req.query.age >= 18) {
        next();
    } else {
        return res.redirect('/404');
    }
}
app.get('/404', (req, res) => {
    res.render('404');
})

app.get('/home', middleware, (req, res) => {
    res.render('home');
})

app.listen(port, (err) => {
    if (err) {
        console.log("Server Is Not Stared..", err);
    }
    console.log("Server IS Connectedddd yeee (https://localhost:6800) ");
})
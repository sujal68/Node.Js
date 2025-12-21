const express = require("express");
const PORT = 6700;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
let id = 105;
let allUser = [
    {
        id: 101,
        name: "Sujal",
        email: "Sujal@gmail.com",
        password: "Sujal@123",
        phone: 9737790499
    },
    {
        id: 102,
        name: "rahul",
        email: "rahul@gmail.com",
        password: "rahul@123",
        phone: 9734560499
    },
    {
        id: 103,
        name: "rohit",
        email: "rohit@gmail.com",
        password: "rohit@123",
        phone: 9745690499
    },
    {
        id: 104,
        name: "pant",
        email: "pant@gmail.com",
        password: "pant@123",
        phone: 9798790499
    },
]


app.get("/", (req, res) => {
    res.render("home", {
        name: "Sujal",
        allUser,
    });
})

app.get('/delete', (req, res) => {
    console.log(req.query);

    allUser = allUser.filter((user) => user.id != req.query.id)

    res.redirect('/');
})

app.post('/addUser', (req, res) => {
    const user = req.body;
    user.id = id;
    id++;

    allUser.push(user);

    res.redirect('/')
})
app.get('/editPage', (req, res) => {

    const user = allUser.find((user) => user.id == req.query.id);

    if (!user) {
        return res.redirect('/')
    }

    res.render('update', {
        user
    })
})

app.post('/update', (req, res) => {
    allUser = allUser.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        }
        else {
            return user;
        }
    })
    res.redirect('/');
})

app.get('/form', (req, res) => {
    res.render('form')
})
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Is NOt Connected..", err);
        return false;
    }
    console.log("Server Are Connected In This Port (https://localhost:6700)");

})
require('./config/db.config');

const express = require('express');
const path = require('path');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", require("./routes/index"));

app.listen(6800, () => {
    console.log("Server Running on http://localhost:5000 🚀");
});
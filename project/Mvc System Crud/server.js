const express = require("express");
require("./config/db.config")
const path = require('path');
const app = express();
const port = 6800;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// jump middelware for jumping index.js 
app.use('/', require('./routes/index'))

app.listen(port, (error) => {
    if (error) {
        console.log("Server Is Not Started!!!!", error);
        return false;
    }
    console.log('Server Is Started In This Port http://localhost:6800');
})
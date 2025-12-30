const Book = require('./model/book.model')
require('./config/db.consig')
const path = require('path');
const fs = require('fs')
const multer = require('multer')
const express = require('express');
const app = express();
const PORT = 6800;

app.use(express.static(path.join(__dirname, "public")))

// multer image folder
app.use('/images', express.static(path.join(__dirname, "images")))
/*
 * Insert : create(body) method in MongoDb Provide 
 *      ex: body :- object {name : "ABC" , Age : 12}
 * 
 * Fetch : find()
 *       return : Array Of Object
 * 
 * Delete : findByIdAndDelete(id)
 *          return : Delete Sinle Data
 * 
 * Update : findByIdAndUpdate(id , body , {new : true})
 *          return : new Updated data
 * 
 * Single data fatch Using Id : findById(id)
 *          return : Single data matched Id
 */

app.set('view engine', "ejs")

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "images/");
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + '-' + file.originalname);
    }
})

// multer middel ware 
const upload = multer({ storage })

// middle were post request data
app.use(express.urlencoded());


// table View Book page
app.get('/', async (req, res) => {

    const allbook = await Book.find();

    return res.render('table', { allbook })
})

// Add Book Form page
app.get('/AddBookPage', (req, res) => {
    return res.render('form')
});

// Edit Book 
app.get('/bookEdit/:BookId', async (req, res) => {
    // console.log(req.params);

    const book = await Book.findById(req.params.BookId);

    // console.log(book);

    if (book) {
        return res.render('edit', { book });
    } else {
        return res.redirect('/');
    }

});

// Update Book
app.post('/BookUpdate', upload.single('BookImg'), async (req, res) => {

    if (req.file) {
        const bookData = await Book.findById(req.body.id)
        req.body.BookImg = req.file.path;
        fs.unlink(bookData.BookImg, (err) => { })

        const book = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

        console.log("Update :", book);
        return res.redirect('/');
    } else {

        const book = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

        console.log("Update :", book);
        return res.redirect('/');
    }

    return res.redirect('/');

})

// Delete Book 
app.get('/bookDelete', async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.query.BookId)

    fs.unlink(deletedBook.BookImg, (err) => { })

    if (deletedBook) {
        console.log("Book Deleted...😄");
    } else {
        console.log("Book Deletion Is faild..🥲");
    }
    return res.redirect('/')
})

// add book 
app.post('/addBook', upload.single('BookImg'), async (req, res) => {
    req.body.BookImg = req.file.path;

    const bookAdded = await Book.create(req.body);

    if (bookAdded) {
        console.log("Book inserted Successfully...");
    } else {
        console.log("Book insertion failed...");
    }

    return res.redirect('/');
})

// Server connect request 
app.listen(PORT, (error) => {
    if (error) {
        console.log("Server Is Not Connected!!", error);
        return false;
    }
    console.log("Server Is Started In This Port https://localhost:6800");

})
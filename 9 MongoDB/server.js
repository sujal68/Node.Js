const Book = require('./model/book.model')
require('./config/db.consig')
const path = require('path');
const multer = require('multer')
const express = require('express');
const app = express();
const PORT = 6800;

app.use(express.static(path.join(__dirname, "public")))
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

// multer 
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

// middle were 
app.use(express.urlencoded());


// table View Book 
app.get('/', async (req, res) => {

    const allbook = await Book.find();

    return res.render('table', { allbook })
})

// Add Book Form
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
app.post('/BookUpdate', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

    if (book) {
        return res.redirect('/');
    } else {
        return res.redirect('/BookUpdate')
    }

})

// Delete Book 
app.get('/bookDelete', async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.query.BookId)
    if (deletedBook) {
        console.log("Book Deleted...😄");
    } else {
        console.log("Book Deletion Is faild..🥲");
    }
    return res.redirect('/')
})

// add book 
app.post('/addBook', upload.single('BookImg'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    req.body.BookImg = "/images/" + req.file.filename;

    const bookAdded = await Book.create(req.body);

    if (bookAdded) {
        console.log("Book inserted Successfully...");
    } else {
        console.log("Book insertion failed...");
    }

    // Book.create(req.body).then(() => {
    //     console.log("Inserted Is Successfully Done");
    // }).catch((error) => {
    //     console.log("Inserted IS Failed!!!", error);
    // })

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
const Post = require('./model/post.model');
const express = require('express');
const multer = require('multer');
require('./config/db.config');
const path = require('path');
const app = express();
const PORT = 6700;

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "public")))

app.get('/', async (req, res) => {
    const allPost = await Post.find();
    return res.render('Linkedin', { allPost });
})

// render Add Form Page 
app.get('/postAddPage', (req, res) => {
    return res.render('postCreatePage')
})

// add post 
app.post('/addPost', async (req, res) => {
    await Post.create(req.body).then(() => {
        console.log("Post Inserted 👍✅");
    }).catch((error) => {
        console.log("Post Insertion Failed ❌", error);
    })

    return res.redirect('/');
})

// delete post 
app.get('/postDelete/:PostId', async (req, res) => {
    await Post.findByIdAndDelete(req.params.PostId).then(() => {
        console.log("Post Deleted..");
    }).catch((error) => {
        console.log("Post Deletion Is Failed.", error);
    })
    return res.redirect('/');
})

// fatch data To Update 
app.get('/postEdit/:PostId', async (req, res) => {
    const post = await Post.findById(req.params.PostId);
    if (post) {
        return res.render('postEditPage', { post })
    } else {
        return res.redirect('/')
    }
})

// update post
app.post('/PostUpdate', async (req, res) => {
    const Posts = await Post.findByIdAndUpdate(req.body.id, req.body);

    if (Posts) {
        return res.redirect('/');
    } else {
        return res.redirect('postEditPage')
    }
})

app.listen(PORT, (error) => {
    if (error) {
        console.log("Server Is Not Connected🥲❌", error);
        return false;
    }
    console.log("Server Is Connected In This Port (http://localhost:6700)");
})
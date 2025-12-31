// require Song model
const Songs = require('./model/song.model')
// require mongoose DataBase 
require('./config/db.config')
// require express third party Module 
const express = require('express');

const app = express();
const PORT = 6800;

app.use('/', express.static('public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded());


// find or fatch song data  
app.get('/', async (req, res) => {
    const allSong = await Songs.find();

    let totalSongs = allSong.length;

    res.render('song', {
        allSong,
        totalSongs
    });
})

// routing Form page
app.get('/songAddPage', (req, res) => {
    return res.render('songAddPage')
})

// Add Songs Data
app.post('/addSong', (req, res) => {
    Songs.create(req.body).then(() => {
        console.log("Song Added Successfully 😄🫡");
    }).catch((error) => {
        console.log("Song Added failed!! 🥲", error);
    })
    return res.redirect('/');
})

// delete Song 
app.get('/SongDelete/:SongId', (req, res) => {
    Songs.findByIdAndDelete(req.params.SongId).then(() => {
        console.log("Song Deleted 😄👍");
    }).catch((error) => {
        console.log("Song Delete failed 🥲❌", error);
    })
    return res.redirect('/')
})

// Update fatch Song data 
app.get('/SongEdit/:SongId', async (req, res) => {
    console.log(req.params);
    const song = await Songs.findById(req.params.SongId);

    if (song) {
        return res.render('editSong', { song })
    } else {
        return res.redirect('/');
    }
})

// Update Song 
app.post('/songUpdate', async (req, res) => {
    const song = await Songs.findByIdAndUpdate(req.body.id, req.body, { new: true });

    if (song) {
        return res.redirect('/')
    } else {
        return res.redirect('/SongEdit')
    }
})



// Create Server 
app.listen(PORT, (error) => {
    if (error) {
        console.log("Server Is Not Connected !!!", error);
        return false;
    }
    console.log("Server Is Connected 😄😄 (http://localhost:6800)");

});
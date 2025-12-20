const mongoose = require('mongoose');

// Create Schema 
const schema = mongoose.Schema({
    songImg: {
        type: String,
        require: true,
    },
    songTitle: {
        type: String,
        require: true,
    },
    songAuth: {
        type: String,
        require: true,
    },
    songAlbum: {
        type: String,
        require: true,
    },
    songAddDate: {
        type: String,
        require: true,
    },
    songDuration: {
        type: String,
        require: true,
    },
});

// Create Schema to Model 
const song = mongoose.model('Song', schema);

// export Song Model 
module.exports = song;
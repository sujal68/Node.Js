const mongoose = require('mongoose');

const PostManage = mongoose.Schema({
    UserName: {
        type: String,
        require: true,
    },
    UserBio: {
        type: String,
        require: true,
    },
    UserImg: {
        type: String,
        require: true,
    },
    PostDiscription: {
        type: String,
        require: true,
    },
    PostImage: {
        type: String,
        require: true,
    }
});

const Post = mongoose.model("post", PostManage);

module.exports = Post;
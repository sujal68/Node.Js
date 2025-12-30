const youtube = require('../model/you.model')
const fs = require('fs');

const Youtube = async (req, res) => {
    const videos = await youtube.find();
    res.render("youtube", { videos });
};

const YoutubeVideoForm = (req, res) => {
    res.render("videoAddForm");
}
const addVideo = async (req, res) => {
    req.body.Thumnail = req.file.path;
    const added = await youtube.create(req.body);
    if (added) {
        console.log("Video Added Successfully..");

    } else {
        console.log("Video Added failed..");
    }
    return res.redirect('/');
};

const YoutubeVideoEdit = (req, res) => {
    res.render("editVideoForm")
}

const VideoDelete = async (req, res) => {

    const DeleteVideo = await youtube.findByIdAndDelete(req.params.DeleteID);
    fs.unlinkSync(DeleteVideo.Thumnail);
    if (DeleteVideo) {
        console.log("Video Deleted SuccessFully✅");

    } else {
        console.log("Video Deletetion Failed❌");
    }
    return res.redirect('/')
}

const VideoUpdate = async (req, res) => {
    const SingleVideoFatch = await youtube.findById(req.params.UpdateID);

    if (SingleVideoFatch) {
        console.log("Video Fatch To Edit SuccessFully✅");

    } else {
        console.log("Video Fatch To Edit Failed❌");
    }
    return res.render('editVideoForm', { SingleVideoFatch })
}

const EditVideo = async (req, res) => {
    if (req.file) {
        req.body.Thumnail = req.file.path;
        const OldVideo = await youtube.findById(req.body.id);
        fs.unlinkSync(OldVideo.Thumnail);
        const UpdateVideo = await youtube.findByIdAndUpdate(req.body.id, req.body, { new: true });
    } else {
        const UpdateVideo = await youtube.findByIdAndUpdate(req.body.id, req.body, { new: true });

        if (UpdateVideo) {
            console.log("Video Update SuccessFully✅");
        } else {
            console.log("Video Updation Failed❌");
        }
        return res.redirect('/');
    }
}

module.exports = {
    Youtube,
    YoutubeVideoForm,
    YoutubeVideoEdit,
    addVideo,
    VideoDelete,
    VideoUpdate,
    EditVideo
};
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
    // req.body.Thumnail = req.file.path;
    // req.body.Profile = req.file.path;
    req.body.Thumnail = req.files['Thumnail'][0].path;
    req.body.Profile = req.files['Profile'][0].path;
    req.body.VideoGif = req.files['VideoGif'][0].path;
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
    // fs.unlinkSync(DeleteVideo.Thumnail);
    // fs.unlinkSync(DeleteVideo.Profile);

    if (!DeleteVideo) {
        console.log("Video Not Found ❌");
        return res.redirect('/');
    }

    if (DeleteVideo.Thumnail && fs.existsSync(DeleteVideo.Thumnail)) {
        fs.unlinkSync(DeleteVideo.Thumnail);
    }
    if (DeleteVideo.Profile && fs.existsSync(DeleteVideo.Profile)) {
        fs.unlinkSync(DeleteVideo.Profile);
    }
    if (DeleteVideo.VideoGif && fs.existsSync(DeleteVideo.VideoGif)) {
        fs.unlinkSync(DeleteVideo.VideoGif);
    }
    console.log("Video Deleted Successfully ✅");
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

    const oldData = await youtube.findById(req.body.id);

    if (!oldData) {
        console.log("Video not found ❌");
        return res.redirect('/');
    }

    // thumnaill
    if (req.files['Thumnail']) {
        if (oldData.Thumnail && fs.existsSync(oldData.Thumnail)) {
            fs.unlinkSync(oldData.Thumnail);
        }
        req.body.Thumnail = req.files['Thumnail'][0].path;
    }

    // profile
    if (req.files['Profile']) {
        if (oldData.Profile && fs.existsSync(oldData.Profile)) {
            fs.unlinkSync(oldData.Profile);
        }
        req.body.Profile = req.files['Profile'][0].path;
    }

    //gif
    if (req.files['VideoGif']) {
        if (oldData.VideoGif && fs.existsSync(oldData.VideoGif)) {
            fs.unlinkSync(oldData.VideoGif);
        }
        req.body.VideoGif = req.files['VideoGif'][0].path;
    }

    await youtube.findByIdAndUpdate(req.body.id, req.body, { new: true });

    console.log("Video Updated Successfully ✅");
    return res.redirect('/');
};

module.exports = {
    Youtube,
    YoutubeVideoForm,
    YoutubeVideoEdit,
    addVideo,
    VideoDelete,
    VideoUpdate,
    EditVideo
};
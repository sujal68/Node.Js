const youtube = require('../model/you.model')
const fs = require('fs');

// Youtube Page 
const Youtube = async (req, res) => {
    const videos = await youtube.find();
    res.render("youtube", { videos });
};

// Add Video Page 
const YoutubeVideoForm = (req, res) => {
    res.render("videoAddForm");
}

// edit Video Page
const YoutubeVideoEdit = (req, res) => {
    res.render("editVideoForm")
}

// Add Youtube Video Logic 
const addVideo = async (req, res) => {
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

// delete Youtube Video Logic 
const VideoDelete = async (req, res) => {

    const DeleteVideo = await youtube.findByIdAndDelete(req.params.DeleteID);

    // if (!DeleteVideo) {
    //     console.log("Video Not Found ❌");
    //     return res.redirect('/');
    // }

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

// Find Youtube video Logic 
const VideoUpdate = async (req, res) => {
    const SingleVideoFatch = await youtube.findById(req.params.UpdateID);

    if (SingleVideoFatch) {
        console.log("Video Fatch To Edit SuccessFully✅");

    } else {
        console.log("Video Fatch To Edit Failed❌");
    }
    return res.render('editVideoForm', { SingleVideoFatch })
}

// edit Youtube Video logic
const EditVideo = async (req, res) => {

    const oldData = await youtube.findById(req.body.id);

    // if (!oldData) {
    //     return res.redirect('/');
    // }

    // add Thumnaill Img 
    if (req.files['Thumnail']) {
        if (oldData.Thumnail && fs.existsSync(oldData.Thumnail)) {
            fs.unlinkSync(oldData.Thumnail);
        }
        req.body.Thumnail = req.files['Thumnail'][0].path;
    }

    // Profile img add 
    if (req.files['Profile']) {
        if (oldData.Profile && fs.existsSync(oldData.Profile)) {
            fs.unlinkSync(oldData.Profile);
        }
        req.body.Profile = req.files['Profile'][0].path;
    }

    // gif Add 
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
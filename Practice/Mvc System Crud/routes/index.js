const multer = require('multer');
const { Youtube, YoutubeVideoForm, YoutubeVideoEdit, addVideo, VideoDelete, VideoUpdate, EditVideo } = require("../controller/home.controller");

const routes = require("express").Router();

const storage = multer.diskStorage({
    destination: (req, fill, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, fill, cb) => {
        cb(null, Date.now() + '-' + fill.originalname);
    }
})

const YoutubeImg = multer({ storage });

routes.get("/", Youtube);
routes.get("/addVideoForm", YoutubeVideoForm);
routes.get("/addVideoEdit", YoutubeVideoEdit);
routes.get("/deleteVideo/:DeleteID", VideoDelete);
routes.get("/editVideo/:UpdateID", VideoUpdate);

// post request
routes.post('/add-video', YoutubeImg.single('Thumnail'), addVideo)
routes.post('/update-video', EditVideo)

module.exports = routes;
const { Youtube, YoutubeVideoForm, YoutubeVideoEdit, addVideo, VideoDelete, VideoUpdate, EditVideo } = require("../controller/home.controller");

const routes = require("express").Router();

routes.get("/", Youtube);
routes.get("/addVideoForm", YoutubeVideoForm);
routes.get("/addVideoEdit", YoutubeVideoEdit);
routes.get("/deleteVideo/:DeleteID", VideoDelete);
routes.get("/editVideo/:UpdateID", VideoUpdate);

// post request
routes.post('/add-video', addVideo)
routes.post('/update-video', EditVideo)

module.exports = routes;
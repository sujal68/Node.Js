const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    UserPage,
    UserForm,
    addUser,
    deleteUser,
    editUserPage,
    updateUser
} = require('../controller/user.controller');


// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.get("/", UserPage);
router.get("/addUserForm", UserForm);
router.get("/editUser/:id", editUserPage);
router.get("/deleteUser/:id", deleteUser);

router.post("/add-user", upload.single("Image"), addUser);
router.post("/update-user", upload.single("Image"), updateUser);

module.exports = router;
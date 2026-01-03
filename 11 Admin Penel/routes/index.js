const express = require('express');
const multer = require('multer');
const { dashborad, viewadmin, addAdmin, addAdminPage } = require('../controller/admin.controller');
const adminRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/admin')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })

adminRoutes.get('/', dashborad)
adminRoutes.get('/viewAdmin', viewadmin)
adminRoutes.get('/addAdmin', addAdminPage)

// post request 
adminRoutes.post('/addAdmin', upload.single('profile'), addAdmin)

module.exports = adminRoutes;
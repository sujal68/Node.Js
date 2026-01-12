const express = require('express');
const multer = require('multer');
const {
    dashborad,
    viewadmin,
    addAdmin,
    addAdminPage,
    deleteAdmin,
    editAdmin,
    updateAdmin,
    loginPage,
    login,
    logout,
    changePasswordPage,
    changePassword,
    profile
} = require('../controller/admin.controller');

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

adminRoutes.get('/', loginPage)
adminRoutes.get('/viewAdmin', viewadmin)
adminRoutes.get('/addAdmin', addAdminPage)
adminRoutes.get('/deleteAdmin/:id', deleteAdmin)
adminRoutes.get('/editAdmin/:id', editAdmin)
adminRoutes.get('/dashboard', dashborad)
adminRoutes.get('/logout', logout)
adminRoutes.get('/change-password', changePasswordPage)
adminRoutes.get('/profile', profile);

// post request 
adminRoutes.post('/addAdmin', upload.single('profile'), addAdmin)
adminRoutes.post('/updateAdmin/:id', upload.single('profile'), updateAdmin)

// login express.request
adminRoutes.post('/login', login)
adminRoutes.post('/change-password', changePassword)


module.exports = adminRoutes;
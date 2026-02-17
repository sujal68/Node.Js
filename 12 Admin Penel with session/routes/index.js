const express = require('express');
const passport = require('passport');
const upload = require('../middleware/multer.middleware');

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
    profile,
    verifyEmail,
    otpPage,
    VerifyOtp,
    forgotPasswordPage,
    forgotPassword
} = require('../controller/admin.controller');

const adminRoutes = express.Router();
adminRoutes.get('/', passport.checkAuthIsNotDone, loginPage);

adminRoutes.post(
    '/login',
    passport.checkAuthIsNotDone,
    passport.authenticate('localAuth', { failureRedirect: '/' }),
    login
);

adminRoutes.post('/verify-email', passport.checkAuthIsNotDone, verifyEmail);

adminRoutes.get('/Otp-Page', passport.checkAuthIsNotDone, otpPage);
adminRoutes.post('/VerifyOtp', passport.checkAuthIsNotDone, VerifyOtp);

adminRoutes.get('/forgot-pass', passport.checkAuthIsNotDone, forgotPasswordPage);
adminRoutes.post('/forgot-pass', passport.checkAuthIsNotDone, forgotPassword);

adminRoutes.get('/dashboard', passport.checkAuthIsDone, dashborad);

adminRoutes.get('/viewAdmin', passport.checkAuthIsDone, viewadmin);
adminRoutes.get('/addAdmin', passport.checkAuthIsDone, addAdminPage);
adminRoutes.post( '/addAdmin',
    passport.checkAuthIsDone,
    upload.single('profile'),
    addAdmin
);

adminRoutes.get('/editAdmin/:id', passport.checkAuthIsDone, editAdmin);
adminRoutes.post('/updateAdmin/:id',
    passport.checkAuthIsDone,
    upload.single('profile'),
    updateAdmin
);

adminRoutes.get('/deleteAdmin/:id', passport.checkAuthIsDone, deleteAdmin);
adminRoutes.get('/profile', passport.checkAuthIsDone, profile);
adminRoutes.get('/change-password', passport.checkAuthIsDone, changePasswordPage);
adminRoutes.post('/change-password', passport.checkAuthIsDone, changePassword);

adminRoutes.get('/logout', passport.checkAuthIsDone, logout);

adminRoutes.use('/category', passport.checkAuthIsDone, require("./category.route"));
adminRoutes.use('/subCategory', passport.checkAuthIsDone, require("./subCategory.route"));
adminRoutes.use('/extraCategory', passport.checkAuthIsDone, require("./extraCategory.route"));
adminRoutes.use('/product', passport.checkAuthIsDone, require("./product.route"));

module.exports = adminRoutes;

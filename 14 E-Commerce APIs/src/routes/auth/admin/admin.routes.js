const express = require('express');
const { registerAdmins, loginAdmin, fetchAdmins, ForgotPassword, VerifyOtp, NewChangePassword } = require('../../../controller/auth/admin/admin.controller');
const { authMiddleware } = require('../../../middleware/auth.middleware');
const adminRouter = express.Router();

adminRouter.post('/registerAdmin', registerAdmins);
adminRouter.post('/loginAdmin', loginAdmin);
adminRouter.post('/Forgotpassword', ForgotPassword);
adminRouter.post('/VerifyOtp', VerifyOtp);
adminRouter.post('/NewChangePassword', NewChangePassword)
// rest APIs
adminRouter.get('/', authMiddleware, fetchAdmins);


module.exports = adminRouter;
const express = require('express');
const { registerAdmins, loginAdmin, fetchAdmins } = require('../../../controller/auth/admin/admin.controller');
const adminRouter = express.Router();

adminRouter.post('/registerAdmin', registerAdmins);
adminRouter.post('/loginAdmin', loginAdmin);
adminRouter.get('/', fetchAdmins)

module.exports = adminRouter;
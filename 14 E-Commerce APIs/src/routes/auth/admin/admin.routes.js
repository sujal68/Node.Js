const express = require('express');
const { registerAdmins, loginAdmin } = require('../../../controller/auth/admin/admin.controller');
const adminRouter = express.Router();

adminRouter.use('/registerAdmin', registerAdmins);
adminRouter.use('/loginAdmin', loginAdmin)

module.exports = adminRouter;
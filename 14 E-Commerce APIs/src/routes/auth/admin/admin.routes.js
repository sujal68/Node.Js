const express = require('express');
const { registerAdmins } = require('../../../controller/auth/admin/admin.controller');
const adminRouter = express.Router();

adminRouter.use('/registerAdmin', registerAdmins);

module.exports = adminRouter;
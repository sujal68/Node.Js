const express = require('express');
const { registerAdmins, loginAdmin, fetchAdmins } = require('../../../controller/auth/admin/admin.controller');
const { authMiddleware } = require('../../../middleware/auth.middleware');
const adminRouter = express.Router();

adminRouter.post('/registerAdmin', registerAdmins);
adminRouter.post('/loginAdmin', loginAdmin);
adminRouter.get('/', authMiddleware, fetchAdmins)

module.exports = adminRouter;
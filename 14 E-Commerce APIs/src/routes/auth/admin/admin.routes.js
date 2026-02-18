const express = require('express');
const { registerAdmin } = require('../../../controller/auth/admin/admin.controller');
const adminRouter = express.Router();

router.use('/registerAdmin', registerAdmin);

module.exports = adminRouter;
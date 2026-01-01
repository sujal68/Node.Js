const express = require('express');
const { dashborad, viewadmin, addAdmin } = require('../controller/admin.controller');
const adminRoutes = express.Router();

adminRoutes.get('/', dashborad)
adminRoutes.get('/viewAdmin', viewadmin)
adminRoutes.get('/addAdmin', addAdmin)

module.exports = adminRoutes;
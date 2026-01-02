const express = require('express');
const { dashborad, viewadmin, addAdmin, addAdminPage } = require('../controller/admin.controller');
const adminRoutes = express.Router();

adminRoutes.get('/', dashborad)
adminRoutes.get('/viewAdmin', viewadmin)
adminRoutes.get('/addAdmin', addAdminPage)

// post request 
adminRoutes.post('/addAdmin', addAdmin)

module.exports = adminRoutes;
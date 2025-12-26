const express = require('express');
const { empPage } = require('../controllers/emp.controller');
const EmpRoutes = express.Router();

console.log("Employee Routing....");

EmpRoutes.get('/employee', empPage)

module.exports = EmpRoutes;
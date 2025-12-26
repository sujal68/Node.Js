const express = require('express');
const { empPage, addEmp, allEmployee } = require('../controllers/emp.controller');
const EmpRoutes = express.Router();

console.log("Employee Routing....");

EmpRoutes.get('/employee', empPage);
EmpRoutes.post('/addEmp', addEmp);
EmpRoutes.get('/allEmp', allEmployee);


module.exports = EmpRoutes;
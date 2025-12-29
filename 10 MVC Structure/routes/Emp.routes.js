const express = require('express');
const { empPage, addEmp, allEmployee, deleteEmp, updateEmp, editEmp } = require('../controllers/emp.controller');
const EmpRoutes = express.Router();

console.log("Employee Routing....");
EmpRoutes.get('/employee', empPage);
EmpRoutes.post('/addEmp', addEmp);
EmpRoutes.get('/allEmp', allEmployee);

EmpRoutes.get('/delete/:id', deleteEmp)
EmpRoutes.get('/edit/:id', updateEmp)

EmpRoutes.post('/UpdateEmp', editEmp)

module.exports = EmpRoutes;
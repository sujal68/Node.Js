const Employee = require('../models/emp.model')

const empPage = (req, res) => {
    return res.render('employee');
}
const addEmp = async (req, res) => {
    console.log(req.body);

    const allEmp = await Employee.create(req.body);

    if (allEmp) {
        console.log("Employee Added SuccessFully");
    } else {
        console.log("Employee Added Failed!");
    }

    return res.redirect('/form/allEmp')
};

const allEmployee = async (req, res) => {
    const allEmp = await Employee.find();
    return res.render('allEmployee', { allEmp });
}

module.exports = {
    empPage,
    addEmp,
    allEmployee
};
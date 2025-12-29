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

const deleteEmp = async (req, res) => {
    const deletedEmp = await Employee.findByIdAndDelete(req.params.id);

    if (deletedEmp) {
        console.log("Employee Deleted Successfully");
    } else {
        console.log("Employee Deletion Failed!");
    }
    return res.redirect('/form/allEmp');
}

const updateEmp = async (req, res) => {
    const edit = await Employee.findById(req.params.id)
    return res.render('EditEmployee', { edit })
}

const editEmp = async (req, res) => {
    console.log(req.body);

    const updateEmp = await Employee.findByIdAndUpdate(req.body.id, req.body, { new: true });
    if (updateEmp) {
        console.log("Employee Updated Successfully");
    }
    else {
        console.log("Employee Updation Failed!");
    }
    return res.redirect('/form/allEmp');
}
module.exports = {
    empPage,
    addEmp,
    allEmployee,
    deleteEmp,
    updateEmp,
    editEmp
};
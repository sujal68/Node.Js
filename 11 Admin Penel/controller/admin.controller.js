const Admin = require('../model/admin.model')
const fs = require('fs');

module.exports.dashborad = (req, res) => {
    return res.render('dashboard')
}
module.exports.viewadmin = async (req, res) => {

    const allAdmin = await Admin.find();
    return res.render('viewAdmin', { allAdmin })
}
module.exports.addAdminPage = (req, res) => {
    return res.render('addAdmin')
}
module.exports.addAdmin = async (req, res) => {
    console.log(req.body);
    try {
        if (req.file) {
            req.body.profile = req.file.path;
        }
        const AddAdmin = await Admin.create(req.body);
        if (AddAdmin) {
            console.log("Admin Insertion SuccessFully!");
            return res.redirect('/viewAdmin')
        }
        else {
            console.log("Admin Insertion failed!");
            return res.redirect('/addAdmin')
        }
    } catch (error) {
        console.log("Something Went Wrong", error);
    }
}

module.exports.deleteAdmin = async (req, res) => {
    const id = req.params.id;
    const deleteAdmin = await Admin.findByIdAndDelete(id);
    if (deleteAdmin) {
        fs.unlinkSync(deleteAdmin.profile);
        console.log("Admin Deleted Successfully!");
    }
    else {
        console.log("Admin Deletion Failed!");
    }
    return res.redirect('/viewAdmin')
}
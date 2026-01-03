const Admin = require('../model/admin.model')

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

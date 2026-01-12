const Admin = require('../model/admin.model')
const fs = require('fs');

module.exports.dashborad = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined && !admin) {
        return res.redirect('/');
    }
    return res.render('dashboard', { admin, currentPath: req.path });
}

module.exports.viewadmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
        return res.render('viewAdmin', { allAdmin, admin, currentPath: req.path })
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

module.exports.addAdminPage = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined && !admin) {
        return res.redirect('/');
    }
    return res.render('addAdmin', { admin, currentPath: req.path })
}

module.exports.profile = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);
    if (req.cookies.adminId == undefined && !admin) {
        return res.redirect('/');
    }
    return res.render('Profile/Profile', { admin, currentPath: req.path })
}

module.exports.changePasswordPage = async (req, res) => {

    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined && !admin) {
        return res.redirect('/');
    }

    return res.render('auth/changePassPage', { admin, currentPath: req.path })

}
module.exports.changePassword = async (req, res) => {

    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        const { currentPass, newPass, ConfPass } = req.body;

        if (currentPass != admin.password) {
            console.log('Current Password Is Not Matched Original Password!!');
            return res.redirect('/change-password')
        }

        if (newPass === admin.password) {
            console.log("New Password or original Password Is Matched!! try Again");
            return res.redirect('/change-password')
        }

        if (ConfPass != newPass) {
            console.log("Confirm Password Note Matched New Password!!");
            return res.redirect('/change-password')
        }

        const ChangePass = await Admin.findByIdAndUpdate(admin._id, { password: newPass }, { new: true });
        console.log(ChangePass);

        if (ChangePass) {
            console.log("Password Updated!!!");
        } else {
            console.log("Password Updation failed!!!");
        }

        return res.redirect('/')

    } catch (error) {
        console.log("Delete error:", error);
        return res.redirect('/');
    }
}

module.exports.loginPage = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId && admin) {
        return res.redirect('/dashboard');
    }
    return res.render('auth/login')
}

module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
}

module.exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            console.log("Admin Not Found!!");
            return res.redirect('/');
        }

        if (admin.password != req.body.password) {
            console.log("Password not matched!!");
            return res.redirect('/');
        }

        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');

    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/')
    }
}

module.exports.addAdmin = async (req, res) => {
    try {

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
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const currentAdmin = await Admin.findById(req.cookies.adminId);

        if (!currentAdmin) return res.redirect('/');

        if (currentAdmin.email !== "sujalkidecha68@gmail.com") {
            return res.redirect('/viewAdmin');
        }

        const id = req.params.id;

        const deleteAdmin = await Admin.findByIdAndDelete(id);

        if (deleteAdmin) {
            if (deleteAdmin.profile && fs.existsSync(deleteAdmin.profile)) {
                fs.unlinkSync(deleteAdmin.profile);
            }
            console.log("Admin Deleted Successfully!");
        }

        return res.redirect('/viewAdmin');

    } catch (err) {
        console.log("Delete error:", err);
        return res.redirect('/');
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        const singleAdmin = await Admin.findById(req.params.id);
        const returnTo = req.query.returnTo || '/viewAdmin';
        return res.render('editAdmin', { singleAdmin, currentPath: req.path, returnTo });
    } catch (err) {
        console.log(err);
        return res.redirect('/viewAdmin');
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profile = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profile, () => { });
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }

        } else {

            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        }
        const returnTo = req.body.returnTo || '/viewAdmin';

        return res.redirect(returnTo);
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error :", err);
        return res.redirect('/viewAdmin');
    }
}

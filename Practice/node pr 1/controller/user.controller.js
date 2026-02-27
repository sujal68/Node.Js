const userModel = require('../model/user.model');
const fs = require('fs');

// Show Users
const UserPage = async (req, res) => {
    const users = await userModel.find();
    return res.render("user", { users });
};

// Add Form
const UserForm = (req, res) => {
    return res.render("addUserForm");
};

// Add User
const addUser = async (req, res) => {

    if (req.file) {
        req.body.Image = req.file.path;
    }

    req.body.Created_date = new Date().toISOString();
    req.body.Updated_date = new Date().toISOString();

    await userModel.create(req.body);

    return res.redirect('/');
};

// Delete User (Hard Delete)
const deleteUser = async (req, res) => {

    const deletedUser = await userModel.findByIdAndDelete(req.params.id);

    if (deletedUser && deletedUser.Image && fs.existsSync(deletedUser.Image)) {
        fs.unlinkSync(deletedUser.Image);
    }

    return res.redirect('/');
};

// Edit Page
const editUserPage = async (req, res) => {
    const singleUser = await userModel.findById(req.params.id);
    return res.render("editUserForm", { singleUser });
};

// Update User
const updateUser = async (req, res) => {

    const oldData = await userModel.findById(req.body.id);

    if (req.file) {
        if (oldData.Image && fs.existsSync(oldData.Image)) {
            fs.unlinkSync(oldData.Image);
        }
        req.body.Image = req.file.path;
    } else {
        req.body.Image = oldData.Image;
    }

    req.body.Updated_date = new Date().toISOString();

    await userModel.findByIdAndUpdate(req.body.id, req.body);

    return res.redirect('/');
};

module.exports = {
    UserPage,
    UserForm,
    addUser,
    deleteUser,
    editUserPage,
    updateUser
};
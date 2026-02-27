const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const moment = require("moment");

const AdminService = require("../../services/auth/admin/admin.service");
const { successResponse, errorResponse } = require("../../utils/response");
const { MSG } = require("../../utils/msg");

const adminService = new AdminService();

module.exports.registerAdmin = async (req, res) => {

    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password)
        return res.status(400).json(errorResponse(400, "Passwords do not match"));

    const existing = await adminService.findAdmin({ email });
    if (existing)
        return res.status(400).json(errorResponse(400, MSG.Email_Exists));

    const hashed = await bcrypt.hash(password, 10);

    await adminService.createAdmin({
        username,
        email,
        password: hashed,
        status: true,
        created_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    return res.status(201).json(successResponse(201, MSG.Admin_Registered));
};


module.exports.loginAdmin = async (req, res) => {

    const { email, password } = req.body;

    const admin = await adminService.findAdmin({ email });
    if (!admin)
        return res.status(400).json(errorResponse(400, MSG.Admin_Not_Found));

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
        return res.status(400).json(errorResponse(400, MSG.Invalid_Credentials));

    const token = JWT.sign(
        { adminId: admin._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );

    return res.status(200).json(successResponse(200, MSG.Admin_Login_Success, { token }));
};
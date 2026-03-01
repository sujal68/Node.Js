const AdminAuthService = require('../../../services/auth/admin/admin.service');
const { successResponse, errorResponse } = require('../../../utils/response');
const { MSG } = require('../../../utils/msg');
const moment = require('moment');
const statusCode = require('http-status-codes');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { sendEmail } = require('../../../utils/mailer');

const adminAuthService = new AdminAuthService();

module.exports.registerAdmins = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.createAt = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const newAdmin = await adminAuthService.registerAdmin(req.body);
        if (!newAdmin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Registration_Failed, newAdmin));
        }
        const AdminLogin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });
        if (!AdminLogin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Login_Failed));
        }
        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, MSG.Admin_Registration_Success));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Internal_Server_Error));
    }
}

module.exports.loginAdmin = async (req, res) => {
    try {
        const admin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });
        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!isPasswordMatch) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_INCORRECT_PAASWORD));
        }

        const payload = {
            id: admin._id,
        }
        const Tocken = JWT.sign(payload, process.env.JWT_SECRET_KEY)


        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.Admin_Login_Success, { token: Tocken }));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.fetchAdmins = async (req, res) => {
    try {
        const allAdmins = await adminAuthService.FetchAllAdmin();
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.Admins_Fetched, allAdmins));
    } catch (err) {
        console.log("Something Went Wrong!!", err);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.ForgotPassword = async (req, res) => {
    try {
        const admin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });
        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        sendEmail(admin.email, OTP);
        const epireOtptime = new Date(Date.now() + 2 * 60 * 1000);
        await adminAuthService.updateAdmin(admin._id, { OTP: OTP, OTPExpiry: epireOtptime });
        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.OTP_Sent_Successfully));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}
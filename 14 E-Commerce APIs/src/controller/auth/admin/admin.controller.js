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
        const password = req.body.password;
        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.createAt = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const newAdmin = await adminAuthService.registerAdmin(req.body);
        if (!newAdmin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Registration_Failed, newAdmin));
        }

        await sendEmail(req.body.email, password)
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

        if (admin.attempt_expire < Date.now()) {
            admin.attempt = 0;
        }

        if (admin.attempt >= 3) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.Many_Time_Otp))
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        sendEmail(admin.email, OTP);

        admin.attempt++;

        const epireOtptime = new Date(Date.now() + 2 * 60 * 1000);

        await adminAuthService.updateAdmin(admin._id, { OTP: OTP, Otp_expire_time: epireOtptime, attempt: admin.attempt });

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.Otp_send_successFully));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}

module.exports.VerifyOtp = async (req, res) => {
    try {
        const admin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });
        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Not_Found));
        }

        if (admin.verify_attempt_expire < Date.now()) {
            admin.verify_attempt = 0;
        }

        if (admin.verify_attempt >= 3) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.Many_Time_Otp))
        }

        if (admin.Otp_expire_time < Date.now()) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse.BAD_REQUEST, true, MSG.Otp_Expire)
        }

        admin.verify_attempt++;

        await adminAuthService.updateAdmin(admin.id, { verify_attempt: admin.verify_attempt, verify_attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });

        if (req.body.OTP !== admin.OTP) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.Invalid_Otp))
        }

        await adminAuthService.updateAdmin(admin.id, { OTP: 0, Otp_Expire: null, verify_attempt: admin.verify_attempt, verify_attempt_expire: new Date(Date.now() + 1000 * 60 * 60) })

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.VERIFY_OTP))

    } catch (error) {
        console.log("Error : ", err);
    }
}

module.exports.NewChangePassword = async (req, res) => {
    try {
        const admin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });

        req.body.new_password = await bcrypt.hash(req.body.new_password, 11);

        const updatedPassword = await adminAuthService.updateAdmin(admin._id, { password: req.body.new_password });

        if (!updatedPassword) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_PASSWORD_UPDATE_FAILED))
        }

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.ADMIN_PASSWORD_UPDATED));

    } catch (error) {
        console.log("Error : ", err);
    }
}
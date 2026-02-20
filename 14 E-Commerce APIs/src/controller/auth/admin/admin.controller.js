const AdminAuthService = require('../../../services/auth/admin/admin.service');
const { successResponse, errorResponse } = require('../../../utils/response');
const { MSG } = require('../../../utils/msg');
const moment = require('moment');
const statusCode = require('http-status-codes');
const bcrypt = require('bcrypt');

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
        return res.status(statusCode.CREATED).json(errorResponse(statusCode.CREATED, false, MSG.Admin_Registration_Success));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
    }
}
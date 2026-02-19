
const AdminAuthService = require('../../../services/auth/admin/admin.service');
const { successResponse, errorResponse } = require('../../../utils/response');
const { MSG } = require('../../../utils/msg');
const moment = require('moment');

const adminAuthService = new AdminAuthService();

module.exports.registerAdmins = async (req, res) => {
    try {
        req.body.createAt = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const newAdmin = await adminAuthService.registerAdmin(req.body);
        if (!newAdmin) {
            return res.status(400).json(successResponse(400, true, MSG.Admin_Registration_Failed, newAdmin));
        }
        return res.status(201).json(errorResponse(201, false, MSG.Admin_Registration_Success));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
    }
}
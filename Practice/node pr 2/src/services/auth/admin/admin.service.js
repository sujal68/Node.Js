const Admin = require("../../../model/admin.model");

module.exports = class AdminService {

    async createAdmin(body) {
        return await Admin.create(body);
    }

    async findAdmin(query) {
        return await Admin.findOne(query);
    }
};
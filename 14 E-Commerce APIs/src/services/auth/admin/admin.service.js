const Admin = require('../../../model/admin.model');

module.exports = class adminAuthService {
    async registerAdmin(body) {
        try {
            return await Admin.create(body);
        } catch (error) {
            console.log("Error", error);
        }
    }
}
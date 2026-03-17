const user = require('../model/user.model');

module.exports = class UserAuthService {
    async registerUser(body) {
        try {
            return await user.create(body);
        } catch (error) {
            console.log("Registration Services Error", error);
        }
    }

    async fetchSingleUser(body) {
        try {
            return await user.findOne(body);
        } catch (err) {
            console.log("Fetch Sigle User Error: ", err);
        }
    }
}
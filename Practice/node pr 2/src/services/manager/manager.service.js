const Manager = require("../../model/manager.model");

module.exports = class ManagerService {

    async createManager(body) {
        return await Manager.create(body);
    }

    async getAll() {
        return await Manager.find();
    }

    async deleteById(id) {
        return await Manager.findByIdAndDelete(id);
    }

    async updateById(id, body) {
        return await Manager.findByIdAndUpdate(id, body, { new: true });
    }
};
const task = require('../model/task.model')

module.exports = class TaskService {
    async addTask(body) {
        try {
            return await task.create(body);
        } catch (error) {
            console.log("Task Add Services Error", error);
        }
    }

    async fetchSingleTask(body) {
        try {
            return await task.findOne(body);
        } catch (err) {
            console.log("Fetch Sigle Task Services Error..", err);
        }
    }

    async fetchTasks(body) {
        try {
            return await task.find(body);
        } catch (err) {
            console.log("Fetch Task Services Error..", err);
        }
    }

    async updateTasks(id, body) {
        try {
            return await task.findByIdAndUpdate(id, body, { new: true });
        } catch (error) {
            console.log("Updation Faild Services", error);
        }
    }
}
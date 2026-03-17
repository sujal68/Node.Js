const TaskServices = require('../services/task.services');
const moment = require('moment')
const taskServices = new TaskServices();
const JWT = require('jsonwebtoken');
const UserAuthServices = require('../services/user.services');
const userAuthServices = new UserAuthServices();

module.exports.Addtask = async (req, res) => {
    try {
        req.body.createAt = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
        let token = req.headers.authorization;

        token = token.slice(7, token.length);
        const decoded = JWT.verify(token, process.env.secretKey);

        const user = await userAuthServices.fetchSingleUser({ _id: decoded.id })
        req.body.userId = user._id;
        const task = await taskServices.addTask(req.body);
        if (!task) {
            return res.status(400).json({ status: 400, error: true, msg: "Tasks Intertion Failed!!!" })
        }
        return res.status(200).json({ status: 200, error: true, msg: "Tasks Intertion Successfully..", result: task })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, error: true, msg: "Something Went Wrong!!" })
    }
}


module.exports.fetchTask = async (req, res) => {
    try {
        let filter = {
            userId: req.user._id,
            isDeleted: false
        };

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        const tasks = await taskServices.fetchTasks(filter);

        return res.status(200).json({
            status: 200, error: false, msg: "Tasks Fetched Successfully", result: tasks
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400, error: true, msg: error.message
        });
    }
};


module.exports.fetchSingleTask = async (req, res) => {
    try {

        const task = await taskServices.fetchSingleTask({ _id: req.query.id });

        return res.status(200).json({ status: 200, error: true, msg: "Tasks Feached Successfully..", result: task })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, error: true, msg: "Something Went Wrong!!" })
    }
}


module.exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await taskServices.updateTasks(req.query.id, req.body);
        return res.status(200).json({ status: 200, error: true, msg: "Tasks Updation Successfully..", result: updatedTask })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, error: true, msg: "Something Went Wrong!!" })
    }
}


module.exports.deleteTask = async (req, res) => {
    try {
        const task = await taskServices.fetchSingleTask({ _id: req.query.id })
        console.log(req.query);


        if (!task) {
            return res.status(400).json({ status: 400, error: true, msg: "Task Not Found!!" })
        }
        const deleteTask = await taskServices.updateTasks(req.query.id, { isDeleted: true, })

        return res.status(200).json({ status: 200, error: true, msg: "Task Deletion Successfully!!", result: deleteTask })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, error: true, msg: "Something Went Wrong!!" })
    }
}
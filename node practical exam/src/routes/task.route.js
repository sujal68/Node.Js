const express = require('express');
const { Addtask, fetchTask, fetchSingleTask, updateTask, deleteTask } = require('../controller/task.controller');

const taskRouter = express.Router();

taskRouter.post('/', Addtask);
taskRouter.get('/', fetchTask);
taskRouter.get('/getSingleTask', fetchSingleTask);
taskRouter.put('/', updateTask);
taskRouter.delete('/', deleteTask)

module.exports = taskRouter;
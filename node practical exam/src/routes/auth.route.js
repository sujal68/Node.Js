const express = require('express');
const authRouter = express.Router();

const { authMiddleware } = require('../middleware/auth.middleware')

authRouter.use('/user', require('./user.route'))
authRouter.use('/Task', authMiddleware, require('./task.route'))

module.exports = authRouter;
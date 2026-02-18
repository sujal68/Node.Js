const express = require('express');
const { registerUser } = require('../../../controller/auth/user/user.controller');
const userRouter = express.Router();

router.use('/registerUser', registerUser);

module.exports = userRouter;
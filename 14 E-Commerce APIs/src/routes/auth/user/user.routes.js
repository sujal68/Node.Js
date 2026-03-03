const express = require('express');
const { registerUser, loginUser, forgotPassword } = require('../../../controller/auth/user/user.controller');
const userRouter = express.Router();

userRouter.post('/registerUser', registerUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/forgotPassword', forgotPassword);

module.exports = userRouter;
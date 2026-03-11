const express = require('express');
const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword, fetchAllUser, deleteUser } = require('../../../controller/auth/user/user.controller');
const userRouter = express.Router();

userRouter.post('/registerUser', registerUser);
userRouter.post('/loginUser', loginUser);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/verifyOTP', verifyOtp);
userRouter.post('/resetPassword', resetPassword);

userRouter.get('/', fetchAllUser);
userRouter.delete('/', deleteUser);


module.exports = userRouter;
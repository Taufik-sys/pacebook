const express=require('express');
const { viewLogin, postLogin } = require('../controller/authController');
const { postEmail, viewEmail, viewChangePassword, postChangePassword } = require('../controller/forgetPasswordController');
const authRouter=express.Router();

authRouter.get('/login',viewLogin);
authRouter.post('/login',postLogin);

authRouter.get('/forgetPassword/emailVerify',viewEmail)
authRouter.post('/forgetPassword/emailVerify',postEmail);

authRouter.get('/forgetPassword/:email/:token',viewChangePassword);
authRouter.post('/forgetPassword',postChangePassword);

module.exports=authRouter;
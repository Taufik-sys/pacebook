const express=require('express');
const { viewRegister, postRegister, landingPage } = require('../controller/adminController');
const { body } = require('express-validator');
const adminRouter=express.Router();

// matches('/[a-z]{1}[A-Za-z0-9]@[a-z]{2,6}.[a-z.]{2,4}/')

const validation=[
    body('fname','Invalid First Name').isEmpty(),
    body('lname','Invalid Last Name').isEmpty(),
    body('email','Invalid Email').isEmail(),
    body('phone_no','Invalid Phone No').isLength({min:10,max:10}),
    body('address','Address Should be minimum 10 characters').isLength({min:10,max:50}),
    body('user_name','Invalid User Name').isLength({min:4,max:10}),
    // body('password','Password should be Alphanumeric').isStrongPassword(),
]

adminRouter.get('/register',viewRegister);
adminRouter.post('/register',validation,postRegister);

adminRouter.get('/',landingPage);

module.exports=adminRouter
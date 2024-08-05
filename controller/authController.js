const userRegisterModel = require("../model/userRegisterModel");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const viewLogin=(req,res)=>{
    res.render('auth/login',{
        title: 'Login Page',
        flash_error:req.flash('error')
    })
}

const postLogin=async(req,res)=>{
    try{
        // console.log('Login Details',req.body);
    let exist_user=await userRegisterModel.findOne({email:req.body.email});
    // console.log('Exist User',exist_user);
    if(exist_user){
        let compare_password=await bcrypt.compare(req.body.password,exist_user.password);
        if(compare_password){
            // console.log('Login Successful');
            const token_data=jwt.sign(
                {userData:exist_user},
                process.env.SECRET_KEY,
                {expiresIn:'1h'}
            )
            res.cookie(
                'cookie_data',
                token_data,
                {
                    expires:new Date(Date.now()+9000000000),
                    httpOnly:true
                }
            )
            // console.log('Login and Token generate Succesfully',token_data);
            // console.log('Cookies',req.cookies);
            res.redirect('/profile');
        }
        else{
            console.log('Password do not match');
            req.flash('error','Password do not match');
            res.redirect('/login');
        }
    }
    else{
        console.log('Email Does not exists');
        req.flash('error','Email does not exists');
        res.redirect('/login');
    }
    }
    catch(err){
        console.log('Error in login',err);
    }
}

const userAuth=(req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        console.log('Need to login first');
        req.flash('error','Need to login first');
        res.redirect('/login');
    }
}

module.exports={
    viewLogin,
    postLogin,
    userAuth
}
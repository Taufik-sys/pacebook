const { validationResult } = require("express-validator");
const userRegisterModel = require("../model/userRegisterModel");
const bcrypt=require('bcryptjs');

const viewRegister=(req,res)=>{
    res.render('admin/userRegistration',{
        title: 'User Registration',
        frontError:[],
        data:{},
        flash_error:req.flash('error')
    })
}

const postRegister=async(req,res)=>{
    try{
        // console.log('User Registration Details',req.body);
        let formData;
        let error=validationResult(req);
        // console.log('Error Response',error);
        if(!error.isEmpty()){
            let errorResponse=validationResult(req).array();
            formData={
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                phone_no:req.body.phone_no,
                address:req.body.address,
                date:req.body.date,
                user_name:req.body.user_name
            }
            res.render('admin/userRegistration',{
                title: 'User Registration',
                frontError:errorResponse,
                data:formData
            })
        }
        else{
            let exist_user=await userRegisterModel.findOne({$or:[{email:req.body.email},{user_name:req.body.user_name}]});
        if(!exist_user){
            if(req.body.password===req.body.confirm_password){
                let hasspass=await bcrypt.hash(req.body.password,12);
                // console.log('Hasspass',hasspass);
                let date=new Date(req.body.date);
                date=date.toLocaleDateString();
                // console.log('Date',date);
                let fullName=req.body.first_name+' '+req.body.last_name;
                // console.log('Full Name',fullName);
                formData=await userRegisterModel({
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    full_name:fullName,
                    email:req.body.email,
                    phone_no:req.body.phone_no,
                    gender:req.body.gender,
                    address:req.body.address,
                    date:date,
                    user_name:req.body.user_name,
                    password:hasspass
                })
                await formData.save();
                console.log('User Successfully registered');
                res.redirect('/login');
                
            }
            else{
                console.log('Password and confirm Password do not match');
                req.flash('error','Password and confirm Password do not match')
                res.redirect('/register');
            }
        }
        else{
            console.log('Email already exists');
            req.flash('error','Email already exists');
            res.redirect('/register');
        }
        }
        
    }
    catch(err){
        console.log('Error in registration',err);
        
    }
}

const landingPage=(req,res)=>{
    res.render('admin/landingPage',{
        title: 'Welcome to PaceBook',
        flash_error:req.flash('error')
    })
}

module.exports={
    viewRegister,
    postRegister,
    landingPage
}
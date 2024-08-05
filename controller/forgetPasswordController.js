const userRegisterModel = require('../model/userRegisterModel');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');
let bcrypt=require('bcryptjs');

const transport=nodemailer.createTransport({
    host:'smtp',
    port:465,
    service:'gmail',
    auth:{
        user:'taufikur1999@gmail.com',
        pass:'ynxi rdso puus auwa'
    }
})

const viewEmail=(req,res)=>{
    res.render('auth/emailVerify',{
        title: 'Email Verification',
        flash_success:req.flash('success')
    })
}

let postEmail=async(req,res)=>{
    try{
        // console.log('Collected email',req.body);
        let pass_token=jwt.sign(
            {email:req.body.email},
            process.env.SECRET_KEY,
            {expiresIn:'1h'}
        )
        console.log('Pass_Token',pass_token);
        let mailOptions={
            from:'taufikur1999@gmail.com',
            to:req.body.email,
            subject:'Change Your Password',
            text:'Hello ' + req.body.email+'\n\n'+
            'Your registration Done Successfully'+'\n\nPlease Confirm your email below'+
            '\n\n'+`http://localhost:5500/forgetPassword/${req.body.email}/${pass_token}` +'\n\nThank You'
        }
        transport.sendMail(mailOptions,(err,data)=>{
            if(err){
                console.log('Error in sending Mail',err);
                res.redirect('/forgetPassword/emailVerify'); 
            }
            else{
                console.log('Email sent',data.response);
                req.flash('success','Email sent successfully')
                res.redirect('/forgetPassword/emailVerify');
            }
        })
        
    }
    catch(err){
        console.log('Error in sending mail',err);
        
    }
}

const viewChangePassword=async(req,res)=>{
    try{
        console.log('Collected Through Params',req.params);
        const exist_user=await userRegisterModel.findOne({email:req.params.email});
        if(exist_user){
            res.render('auth/forgetPassword',{
                title: 'Change Password',
                data: exist_user
            })
            console.log('Email Succesfully verified');
        }
        else{
            console.log('Invalid Email');
            req.flash('error','Invalid Email');
        }
    }
    catch(err){
        console.log('Error in verification of mail',err);
    }
}

const postChangePassword=async(req,res)=>{
    try{
        console.log('Collected Details',req.body);
        if(req.body.password===req.body.confirm_password){
            let hasspass=await bcrypt.hash(req.body.password,12);
            await userRegisterModel.findOneAndUpdate({email:req.body.email},{password:hasspass});
            res.redirect('/login');
        }
        
    }
    catch(err){
        console.log('Error in Changing Password',err);
        
    }
}

module.exports={
    viewEmail,
    postEmail,
    viewChangePassword,
    postChangePassword
}
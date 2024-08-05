const likeModel = require("../model/likeModel");
const postModel = require("../model/postModel");
const userRegisterModel = require("../model/userRegisterModel");
const final_date = require("../public/js/finalDate");
const bcrypt=require('bcryptjs');

const viewProfile=async(req,res)=>{
    try{
        let auth_data=req.user.userData
        let user_data=await userRegisterModel.findOne({email:auth_data.email});
        // console.log('User Data',user_data);
        // console.log('Auth Data',auth_data);
        let joining_date=auth_data.createdAt.slice(0,10)
        // console.log('Joining Date',joining_date);
        let final_joining_date=final_date(joining_date);
        // console.log('Final Date',final_joining_date);
        res.render('frontend/profile',{
            title: 'View Profile',
            profile_data:user_data,
            auth_data:auth_data,
            joining_date:final_joining_date
        })
    }
    catch(err){
        console.log('Error in viewing Profile Page',err);
    }
}

const viewEditProfile=async(req,res)=>{
    // console.log('Collected Id',req.params.id);
    const exist_data=await userRegisterModel.findOne({_id:req.params.id});
    if(exist_data){
        res.render('frontend/editProfile',{
            title: 'Edit Profile',
            data: exist_data
        })
    }

}

const postEditProfile=async(req,res)=>{
    try{
        // console.log('Edit Details',req.body);
        console.log('Collected Id',req.body.id);
        let update_data=await userRegisterModel.findOneAndUpdate({_id:req.body.id},{
            first_name:req.body.first_name,
            user_name:req.body.user_name,
            phone_no:req.body.phone_no,
            gender:req.body.gender,
            education:req.body.education,
            workplace:req.body.workplace,
            relationship:req.body.relationship
        });
        // await update_data.save();
        if(update_data){
            console.log('Update Successfully');
            res.redirect('/profile')
        }
    }
    catch(err){
        console.log('Error in editing Profile',err);
    }
}

const homePage=async(req,res)=>{
    try{
        let user_data=req.user.userData;
        // let count=0;
        // console.log('Count',req.body.count);
        if(!req.body.count){
            count=10
        }
        else{
            count=+req.body.count+10;
        }
        
        console.log(count);
            let posts=await postModel.aggregate([{
                $limit:count
            }])
            // console.log('Other Posts',posts);

            let friendList=await userRegisterModel.aggregate([{
                $match:{
                    email:{$ne:req.user.userData.email}
                }
            }])
            // console.log('Friends',friendList);

            if(posts){
                res.render('frontend/home',{
                    title: 'Home Page',
                    user_data:user_data,
                    data:posts,
                    count:count,
                    friends:friendList
                })
            }
    }
    catch(err){
        console.log('Error in viewing Homepage',err);
    }
}

const logout=(req,res)=>{
    res.clearCookie('cookie_data');
    res.redirect('/login');
}


const userImage=(req,res)=>{
    let data=req.user.userData._id;
    res.render('frontend/userImage',{
        title: 'User Image',
        data:data
    })
}

const postUserImage=async(req,res)=>{
    try{
        // console.log("Collected Data",req.body,req.file);
        await userRegisterModel.findOneAndUpdate({_id:req.body.id},{
            user_image:req.file.filename
        })
        res.redirect('/profile')
    }
    catch(err){
        console.log('Error in collecting Image',err);
        
    }
}

const viewChangePassword=async(req,res)=>{
    try{
        let data=req.user.userData;
    console.log('User Data',data);
    
    res.render('frontend/changePassword',{
        title: 'Change Password',
        data:data
    }) 
    }
    catch(err){
        console.log('Error in viewing Page',err);
        
    }  
}

const postChangePassword=async(req,res)=>{
    try{
        // console.log('Collected data',req.body);
    if(req.body.password===req.body.confirm_password){
        const hasspass=await bcrypt.hash(req.body.password,12);
            await userRegisterModel.findOneAndUpdate({_id:req.body.id},{
            email:req.body.email,
            password:hasspass
        })
        res.render('misc/changePasswordSuccess',{
            title: 'Change Password Successful'
        })
    }
    else{
        console.log('Password and Confirm Password do not match');
    }
    }
    catch(err){
        console.log('Error in changing password',err);
    }
}

const deleteAccount=async(req,res)=>{
    try{
        console.log('Collected Id',req.params.id);
        
        await userRegisterModel.deleteOne({_id:req.params.id});
        await postModel.deleteMany({_id:req.params.id});
        res.render('misc/deleteSuccess',{
            title: 'Delete Successful'
        })
    }
    catch(err){
        console.log('Error in deletion of Accounts',err);
        
    }
}

const postBio=async(req,res)=>{
    try{
        console.log(req.body);
        await userRegisterModel.findOneAndUpdate({_id:req.body.id},{bio:req.body.bio})
    }
    catch(err){
        console.log('Error in adding bio',err);
    }
}

module.exports={
    viewProfile,
    viewEditProfile,
    postEditProfile,
    homePage,
    logout,
    userImage,
    postUserImage,
    viewChangePassword,
    postChangePassword,
    deleteAccount,
    postBio
}
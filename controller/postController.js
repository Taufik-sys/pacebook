const postModel = require("../model/postModel");
const userRegisterModel = require("../model/userRegisterModel");

const viewPostForm=async(req,res)=>{
    try{
        let data=req.user.userData;
        console.log('Data',data);
        let user_data=await userRegisterModel.findOne({email:data.email});
        console.log('User Data',user_data);
        res.render('post/addPost',{
            title: 'Add Post',
            data:user_data
        })
    }
    catch(err){
        console.log('Error in viewing page',err);
    }
}

const postStatus=async(req,res)=>{
    try{
        console.log('Post Details',req.body,req.file);
        let formData=await postModel({
            post_media:req.file.filename,
            post_text:req.body.post_text,
            email:req.body.email,
            full_name:req.body.full_name,
            owner_id:req.body.id
        })
        await formData.save();
        res.redirect('/profile');
    }
    catch(err){
        console.log('Error in posting a Post',err);
    }
}

const viewYourPosts=async(req,res)=>{
    try{
        // console.log('Login User',req.user);
        let user_data=req.user.userData
        let find_posts=await postModel.find({email:user_data.email});
        // console.log('All posts',find_posts);
        if(find_posts){
            res.render('post/viewPost',{
                title: 'Your Own Posts',
                data:find_posts,
                user_data:user_data
            })
        }
    }
    catch(err){
        console.log('Error in viewing Posts',err);
    }
}

module.exports={
    viewPostForm,
    postStatus,
    viewYourPosts
}
const commentModel = require("../model/commentModel");
const likeModel = require("../model/likeModel");
const postModel = require("../model/postModel");

const postComment=async(req,res)=>{
    try{
        // console.log('Comments Details',req.body);
        let formData=await commentModel({
            owner_email:req.body.owner_email,
            user_email:req.body.user_email,
            user_name:req.body.user_name,
            comment:req.body.comment,
            postId:req.body.id,  
        })
        await formData.save();
        res.redirect('/home');
    }
    catch(err){
        console.log('Error in commenting Post',err);
    }
}

const allComments=async(req,res)=>{
    try{
        console.log('Collected Id',req.params.id);
        let comment=await commentModel.find({postId:req.params.id});
        console.log('All Comments',comment);
        res.render('post/allComments',{
            title: 'All Comments',
            data:comment
        })
    }
    catch(err){
        console.log('Error in fetching all comments',err);
    }
}

// const postLike=async(req,res)=>{
//     try{
//         console.log('Like Details',req.body);
//         let formData;
//         let exist_post=await postModel.findOne({_id:req.body.id});
//         console.log('Exist Post',exist_post);
//         let exist_post_like=await likeModel.findOne({postId:req.body.id});
//         console.log('Exist Post Like',exist_post_like);
//         let exist_post_user=await likeModel.findOne({$and:[{postId:req.body.id},{user_email:req.body.user_email}]});
//         console.log('Exist_User',exist_post_user);
//         if(!exist_post_like){
//                 formData=await likeModel({
//                 owner_email:req.body.owner_email,
//                 user_email:req.body.user_email,
//                 postId:req.body.id,  
//             })
//             await formData.save();
//             await postModel.findOneAndUpdate({postId:req.body.id},{like:1});
//         }
//         else{
//             like=exist_post_like.like+1;
//             formData=await likeModel.findOneAndUpdate({postId:req.body.id},{
//                 like:like,
//             });
//             await postModel.findOneAndUpdate({postId:req.body.id},{like:like});
//         }
//         if(exist_post_user){
//             like=exist_post.like-1;
//             formData=await likeModel.findOneAndUpdate({postId:req.body.id},{
//                 like:like,
//             });
//             await postModel.findOneAndUpdate({postId:req.body.id},{like:like});
//         }
//         if(exist_post.like===0){
//             let find_like=await likeModel.findOne({postId:req.body.id});
//             console.log('find_like',find_like);
//             await postModel.findOneAndUpdate({_id:req.body.id},{
//                 like:find_like.like
//             })
//         }
//         res.redirect('/home/req.body._id');
//     }
//     catch(err){
//         console.log('Error in liking post',err);
//     }
// }

const like=async (req,res,next)=>{
    try{
        console.log(('Like Details',req.body));
        let data=req.user.userData.email;
        console.log('User Email',data);
        let exist_post=await likeModel.findOne({$and:[{postId:req.body.id},{user_email:data}]});
        // console.log('Exist Post',exist_post);
        if(exist_post){
            let like_result=false
            if(!exist_post.like){
                like_result=true
            }
            exist_post.like=like_result
            await exist_post.save();
        }
        else{
            let formData=await likeModel({
                owner_email:req.body.owner_email,
                user_email:data,
                like:true,
                postId:req.body.id
            })
            await formData.save();
        }
        let exist_post_model=await postModel.findOne({_id:req.body.id});
        console.log('exist post',exist_post_model);
        let like_post=await likeModel.find({$and:[{postId:req.body.id},{like:true}]})
        console.log('Like Post',like_post.length);
        await postModel.findOneAndUpdate({_id:req.body.id},{
            likes:like_post.length
        })
        // res.redirect('/home')
        next();
        
    }
    catch(err){
        console.log('Error in liking page',err);
    }
    }

module.exports={
    postComment,
    allComments,
    like
}
const express=require('express');
const Token=require('../middleware/isAuth')
const { userAuth } = require('../controller/authController');
const { viewProfile, viewEditProfile, postEditProfile, homePage, logout, userImage, viewChangePassword, postChangePassword, postUserImage, deleteAccount, postBio, } = require('../controller/userController');
const { viewPostForm, postStatus, viewYourPosts } = require('../controller/postController');
const userRouter=express.Router();
const multer=require('multer');
const path=require('path');
const { postComment, allComments, like, } = require('../controller/likeAndCommentController');

const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{

        callback(null,path.join(__dirname,'..','uploads'),(err,data)=>{
            if(err){
                throw err
            }
        })
    },
    filename:(req,file,callback)=>{

        callback(null,file.originalname,(err,data)=>{
            if(err){
                throw err
            }
        })
    }
})

const fileFilter=(req,file,callback)=>{
    if(
        file.mimetype.includes('jpeg')||
        file.mimetype.includes('jpg')||
        file.mimetype.includes('png')||
        file.mimetype.includes('webp')||
        file.mimetype.includes('svg')||
        file.mimetype.includes('gif')
    )
    callback(null,true)
    else
    callback(null,false)
}

const upload=multer({
    storage:fileStorage,
    fileFilter:fileFilter,
    limits:{fieldSize:1025*1025*5}
})

userRouter.get('/profile',Token.checkToken,userAuth,viewProfile);

userRouter.get('/editProfile/:id',Token.checkToken,userAuth,viewEditProfile);
userRouter.post('/editProfile/:id',Token.checkToken,userAuth,postEditProfile);

userRouter.get('/addPost',Token.checkToken,userAuth,viewPostForm);
userRouter.post('/addPost',Token.checkToken,userAuth,upload.single('post_image'),postStatus);

userRouter.get('/viewYourPosts',Token.checkToken,userAuth,viewYourPosts)

userRouter.post('/postComment',Token.checkToken,userAuth,postComment);
userRouter.get('/allComments/:id',Token.checkToken,userAuth,allComments);

userRouter.get('/home',Token.checkToken,userAuth,homePage);
userRouter.post('/home/:count',Token.checkToken,userAuth,homePage);

userRouter.get('/logout',Token.checkToken,userAuth,logout);

userRouter.post('/postLike',Token.checkToken,userAuth,like,homePage)

userRouter.get('/userImage',Token.checkToken,userAuth,userImage);
userRouter.post('/userImage',Token.checkToken,userAuth,upload.single('user_image'),postUserImage);

userRouter.get('/changePassword',Token.checkToken,userAuth,viewChangePassword);
userRouter.post('/changePassword',Token.checkToken,userAuth,postChangePassword);

userRouter.get('/deleteAccount/:id',Token.checkToken,userAuth,deleteAccount);

userRouter.post('/postBio',Token.checkToken,userAuth,postBio);

module.exports=userRouter;
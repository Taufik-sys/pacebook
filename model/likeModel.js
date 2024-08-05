const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    owner_email:{
        type:String,
        required:false
    },
    user_email:{
        type:String,
        required:false
    },
    like:{
        type:Boolean,
        default:false
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post_details'
    }
},{
    timestamps:true,
    versionKey:false
})

const likeModel=new mongoose.model('like_details',likeSchema);

module.exports=likeModel
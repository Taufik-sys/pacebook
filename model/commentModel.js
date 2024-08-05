const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    owner_email:{
        type:String,
        required:false
    },
    user_email:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        default:''
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post_details'
    }
},{
    timestamps:true,
    versionKey:false
})

const commentModel=new mongoose.model('comment_details',commentSchema);

module.exports=commentModel
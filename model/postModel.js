const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    post_media:{
        type:String,
        default:''
    },
    post_text:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_register_details'
    }
},{
    timestamps:true,
    versionKey:false
})

const postModel=new mongoose.model('post_details',postSchema);

module.exports=postModel;
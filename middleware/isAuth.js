const jwt=require('jsonwebtoken');

class Token{
    async checkToken(req,res,next){
        try{
            if(req.cookies&&req.cookies.cookie_data){
                jwt.verify(req.cookies.cookie_data,process.env.SECRET_KEY,(err,data)=>{
                    // console.log('User Data',data);
                    req.user=data;
                    next();
                })
            }
            else{
                next();
            }
        }
        catch(err){
            console.log('Error in Authentication',err);
        }
    }
}

module.exports=new Token();

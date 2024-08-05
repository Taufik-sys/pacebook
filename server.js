require('dotenv').config();
const express=require('express');
const appServer=express();
const mongoose=require('mongoose');
const cookie=require('cookie-parser')
const adminRouter = require('./router/adminRouter');
const port=process.env.PORT||5500;
const path=require('path');
const session=require('express-session');
const flash=require('connect-flash');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');

appServer.set('view engine','ejs');
appServer.set('views','view');

appServer.use(express.urlencoded({extended:true}));
appServer.use(express.static(path.join(__dirname,'public')));
appServer.use(express.static(path.join(__dirname,'uploads')));

appServer.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
}));

appServer.use(flash());

appServer.use(cookie())

appServer.use(userRouter);
appServer.use(authRouter);
appServer.use(adminRouter);
mongoose.connect(process.env.DB_URL)
.then(res=>{
    appServer.listen(port,()=>{
        console.log(`Server and Database connected successfully at http://localhost:${port}/`);
    });
})
.catch(err=>{
    console.log('Error in connected database or server',err);
})
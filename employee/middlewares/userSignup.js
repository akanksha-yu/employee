const mongoose=require("mongoose");
const {User}=require("../models/user")



exports.userSignup=(req,res,next)=>
{
User.findOne({Username:req.body.Username})
.then(exist=>{

    if(exist!==null){
    res.send("hello there!user already exists.Try with a different username")
    }
    else{
    next();
    }
}
)
  
}
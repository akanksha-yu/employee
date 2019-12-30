const mongoose=require("mongoose");
const {User} =require("../models/user");
exports.signupHandler=(req,res)=>{
    console.log(req.body)
    const user=new User({
        Username:req.body.Username,
        Password:req.body.Password
    })
    user.save().then(user=>{
        res.send(user)
    })
}
exports.loginHandler=(req,res)=>{
   
    User.find({Username:req.body.Username,Password:req.body.Password})
    .then(user=>{
        if(user.length>0){
        res.send({Username:user[0].Username,Id:user[0]._id})}
        else{
            res.end()
        }
    })
}
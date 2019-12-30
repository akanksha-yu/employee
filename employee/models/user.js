const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    Username:String,
    Password:String,
    id:String,
})
const User=mongoose.model('user',userSchema)

module.exports={User}
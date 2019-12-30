const mongoose=require('mongoose');
const {Schema}=mongoose;

const todoSchema=new Schema({
    Title:String,
    Id:String,
    Creator:String,
    Done:{type:Boolean,default:false},
    Category:String,
    Description:String,
    Bucket:{type:String,default:"Bucket Not Assigned"}
})
const Todo=mongoose.model('todo',todoSchema)

module.exports={Todo}
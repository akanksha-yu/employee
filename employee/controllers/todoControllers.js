const mongoose=require('mongoose')
const {Todo}=require("../models/todos")
exports.addTodoHandler=(req,res)=>{
    const todo=new Todo({
        Title:req.body.Title,
    Creator:req.body.Creator,
    Category:req.body.Category,
    Description:req.body.Description,
    Bucket:req.body.Bucket
    })
    todo.save().then(result=>{
        Todo.find({Creator:req.body.Creator}).then(todos=>{
            res.send(todos)
        })
    })
}
exports.editTodoHandler=(req,res)=>{
    console.log(req.body)
    Todo.findOneAndUpdate({_id:req.body.id},{$set:{Title:req.body.Title,Category:req.body.Category
    ,Description:req.body.Description,Bucket:req.body.Bucket}},{new:true})
    .then(result=>{
        Todo.find({Creator:req.body.Creator})
        .then(todos=>{
            
            res.send(todos)
        })
    })
}
exports.fetchMyTodosHandler=(req,res)=>{
    Todo.find({Creator:req.query.Creator})
    .then(todos=>{
        
        res.send(todos)
    })
}
exports.deleteTodoHandler=(req,res)=>{
    Todo.findOneAndDelete({_id:req.query.id})
    .then(result=>{
        Todo.find({Creator:req.query.Creator})
        .then(todos=>{
            console.log(todos);
            res.send(todos)
    })})
}
exports.markDoneHandler=(req,res)=>{
    Todo.findOneAndUpdate({_id:req.body.id},{$set:{Done:true}},{new:true})
    .then(result=>{
       
        Todo.find({Creator:req.body.Creator})
        .then(todos=>{
            console.log(todos)
            res.send(todos)
    })
    })
}
exports.markUndoneHandler=(req,res)=>{
    Todo.findOneAndUpdate({_id:req.body.id},{$set:{Done:false}},{new:true})
    .then(result=>{
        
        Todo.find({Creator:req.body.Creator})
        .then(todos=>{
            console.log(todos)
            res.send(todos)
    })
    })
}

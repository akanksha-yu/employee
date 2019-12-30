const controllers=require("../controllers/todoControllers")


module.exports=app=>
{
    app.post("/api/addTodo",controllers.addTodoHandler);
    app.get("/api/fetchMyTodos",controllers.fetchMyTodosHandler);
    app.put("/api/markDone",controllers.markDoneHandler);
    app.put("/api/markUndone",controllers.markUndoneHandler);
    app.put("/api/editTodo",controllers.editTodoHandler)
    app.delete("/api/deleteTodo",controllers.deleteTodoHandler)
}
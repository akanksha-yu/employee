import React from "react";
import {connect} from "react-redux"
import "./todos.css"
import {fetchMyTodos,deleteTodo,markDone,markUndone} from "../../actions/todo"
import CreateTodo from "../createTodo/createTodo";
class Todos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showCreateTodo:false,
            showMyTodos:true,
            activeTodo:null,
            bucketData:[],
            search:"",
            showMyBuckets:false
        }
        if(this.props.user===undefined){
            this.props.history.push("/");
        }
    }
    componentDidMount(){
       if(this.props.user){
        this.props.fetchMyTodos({Creator:this.props.user.Username})
       }
    }
    componentDidUpdate(prevProps,prevState){
       
        if(this.props.todos!==prevProps.todos){
            this.setState((prevstate)=>{
                const data=this.props.todos.map((todo,i)=>{
                    return todo.Bucket
                })
                return{
                bucketData:[...data]
                }
            }
               )
            
        }
    }
    renderTodos=(filterTodos)=>{
        if(filterTodos && filterTodos.length > 0){
        return filterTodos.map((todo,i)=>{
            return(
                <div className="todos-list" key={i}>
                <div className="todo-data"><span>Title:</span>{todo.Title}</div>
               <div className="todo-data"> <span>Category:</span>{todo.Category}</div>
               <div className="todo-data"> <span>Description:</span>{todo.Description}</div>
               <div className="todo-data"> <span>Bucket:</span>{todo.Bucket}</div>
               {todo.Done ? <button className="btn btn-done" disabled>Mark as Done</button>:
            <button className="btn btn-done"
             onClick={e=>{this.props.markDone(todo._id,todo.Creator)}}>Mark as Done</button>}
               {todo.Done ? <button className="btn btn-undone"
               onClick={e=>this.props.markUndone(todo._id,todo.Creator)}>Mark as Undone</button>:
               <button className="btn btn-undone" disabled>Mark as Undone</button>
            }
                <span className="work-btn">
                <button className="btn btn-edit" onClick={e=>this.editTodo(todo)}>Edit Todo</button>
                <button className="btn btn-delete"
                 onClick={e=>{this.props.deleteTodo(todo._id,todo.Creator)}}>Delete</button>
                </span>
               </div>
            )
        })
    }
  
    else{
        return <span className="error-todo">Todos not found.</span>
    }
    }
    renderBuckets=()=>{
        if(this.props.todos && this.props.todos.length >0){
          let {todos}=this.props;
          let obj={};
            for(let i=0;i<todos.length;i++){
                if(obj[todos[i].Bucket]){

                }
                else{
                    obj[todos[i].Bucket]=todos[i].Bucket
                }
            }
         const Buckets=Object.keys(obj).map((todo,i)=>{
            
               return (
                   <div className="todo-list" key={i} style={{cursor:"pointer",borderBottom:"1px solid white",background:"rgba(70, 4, 14, 0.8)"}}>
                       <div className="todo-data" onClick={e=>{
                           this.setState({search:obj[todo],
                            showMyTodos:true,
                            showMyBuckets:false
                        })}}
                       ><span>Bucket Name:</span>{obj[todo]}</div>
                   </div>
               )
                    

       })
      
      
       return Buckets;
    }
    else{
        return <span className="error-todo">No buckets created</span>
    }
}

    showMyBuckets=()=>{
        this.setState((prevstate)=>{
            return{
            showCreateTodo:false,
            showMyTodos:false,
            showMyBuckets:true
            }
        })
    }
    activeTodoDone=()=>{
        this.setState({
            activeTodo:null
        })
    }
    editTodo=(todo)=>{
        this.setState((prevstate)=>{
            return{
                showMyTodos:!prevstate.showMyTodos,
                showCreateTodo:!prevstate.showCreateTodo,
                activeTodo:todo
            }
        })
    }
    showMyTodos=()=>{
        this.setState((prevstate)=>{
            return{
            showMyTodos:true,
            showCreateTodo:false,
            showMyBuckets:false,
            search:""
            }
        })
    }
    showCreateTodo=()=>{
        this.setState((prevstate)=>{
            return{
            showCreateTodo:true,
            showMyTodos:false,
            showMyBuckets:false
            }
        })
    }
    closeCreateTodo=()=>{
        this.setState({showCreateTodo:false,showMyTodos:true})
    }
    render(){
      let filterTodos=[]
        if(this.props.todos && this.props.todos.length >0 ){
  filterTodos= this.props.todos.filter((todo,i)=>{
    if(todo.Bucket===(this.state.search)){
    return todo
    }
   })
}
console.log(filterTodos)

        return(
            <React.Fragment>
              
            <div className="todos-container">
            
            <div className="todos-headers" onClick={e=>{this.showCreateTodo()}}>Create Todos
         
         </div>
            <div className='todos-headers' onClick={e=>this.showMyTodos()}>My Todos</div>

            <div className="todos-headers" onClick={e=>{this.showMyBuckets()}}>My Buckets</div>
            
         
            </div>
              <div className={this.state.showCreateTodo?"todo-form-container animate-form":"remove-form-container"}>
              <CreateTodo data={this.state.bucketData} activeTodoDone={this.activeTodoDone} todo={this.state.activeTodo} user={this.props.user} closeCreateTodo={this.closeCreateTodo}/>
          </div>
          
         {this.state.showMyTodos &&<div className="todos-list-container">
         <div className="search-container">
                   <label>Search using BucketName:</label>
                   <input type="text" className="input-field search"  style={{backgroundColor:"rgba(0,0,0,0.8)"}} value={this.state.search} onChange={e=>{this.setState({search:e.target.value})}}/>
                   </div>
             {this.renderTodos(this.state.search!==""?filterTodos:this.props.todos)}
             
         </div>} 
         {this.state.showMyBuckets && <div className="todos-list-container">
            {this.renderBuckets()}
             </div>}
          </React.Fragment>
        )
    }
   
}

const mapStateToProps=(state)=>{
    return{
        user:state.User.user,
        todos:state.Todos.myTodos
    }
}
export default connect(mapStateToProps,{fetchMyTodos,deleteTodo,markDone,markUndone})(Todos);
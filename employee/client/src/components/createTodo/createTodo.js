import React from "react"
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {addTodo,editTodo} from "../../actions/todo"
class CreateTodo extends React.Component{
    constructor(props){
        super(props);
       
        this.state={
            emp_id: "",
            firstName:"",
            lastName: "",
            age:"",
            Bucket:"",
            data:this.props.data
        }
    }
    componentDidUpdate(prevProps,prevState){
  
        if(prevProps.todo!==this.props.todo && this.props.todo !==null){
            this.setState({
                emp_id:this.props.todo.emp_id,
                firstName:this.props.todo.firstName,
             lastName:this.props.todo.lastName,
             age:this.props.todo.age
              
            })
        }
        if(prevProps.data!==this.props.data){
            this.setState({
                data:this.props.data
            })
        }
    }
    handleChange=(value,name)=>{
        this.setState((prevstate)=>{

            return{
            [name]:value
            }
        })
    }
    handleDatalistChange=(e)=>{
        this.setState({
            Bucket:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
    let {emp_id,firstName,lastName,age,Bucket}=this.state;
     const Creator=this.props.user.Username;
     if(Bucket===""){
        Bucket="Customised"
     }
     if(this.props.todo===null){
        this.props.addTodo({emp_id,firstName,lastName,age,Bucket},this.props.closeCreateTodo)
     }
     else{
      
         this.props.editTodo({id:this.props.todo.emp_id,firstName,lastName,age,Creator,Bucket},this.props.closeCreateTodo, this.props.activeTodoDone)
        
     }
    
    }
  
    renderTodoForm=()=>{
        const fields=[ {tag:"input",label:"emp_id",type:"text",className:"input-field",
        value:this.state.emp_id,onChange:this.handleChange},
        {tag:"input",label:"firstName",type:"text",className:"input-field",
        value:this.state.firstName,onChange:this.handleChange},
        {tag:"input",label:"lastName",type:"text",className:"input-field",
        value:this.state.lastName,onChange:this.handleChange},
        {tag:"input",label:"age",type:"text",className:"input-field",
        value:this.state.age,onChange:this.handleChange}
    
    ]
       return fields.map((field,i)=>{
           if(field.tag==="input"){
            return(
                <div className="field-container" key={i}>
                <label>{field.label}:</label>
                <input className="input-field" type={field.type} value={field.value} onChange={(e)=>field.onChange(e.target.value,field.label)} />
                </div>
            )
           }
         
        })
       
    }
    render(){
      
        const styleobj={
            color:"white",
           textAlign:"right",
            margin:"15px",
            cursor:"pointer",
            padding:"4px"
        }
        return(
            <React.Fragment>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <div style={styleobj} onClick={e=>{this.props.closeCreateTodo()}}>X</div>
                    <div>
                {this.renderTodoForm()}
                <div className="field-container">
                    <label>Bucket:</label>
                <input type="text" className="input-field" list="data" onChange={this.handleDatalistChange} />

               <datalist id="data">
       {this.state.data.map((item, key) =>
         <option key={key} value={item} />
  )}
</datalist>
</div>
                </div>
                {this.props.todo===null?<button type="submit" className="btn-login">Create Todo</button>
                :<button type="submit" className="btn-login">Edit Todo</button>}
                </form>
                
            </React.Fragment>
        )
    }
}

export default withRouter(connect(null,{addTodo,editTodo})(CreateTodo));
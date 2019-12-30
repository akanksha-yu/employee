import React from "react"
import "./login.css";
import {withRouter} from "react-router-dom";
import {login} from "../../actions/user";
import {connect} from 'react-redux';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Username:"",
            Password:"",
            notFound:""
        }
    }
    handleChange=(value,name)=>{
        this.setState((prevstate)=>{
            return{
            [name]:value
            }
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.login({Username:this.state.Username,Password:this.state.Password},
            this.props.history,this.userNotFound)
    }
    userNotFound=(errorData)=>{
        this.setState({notFound:errorData});
        setTimeout(()=>this.setState({
            notFound:""
        }),2000)
    }
    renderLoginForm=()=>{
        const fields=[
        {tag:"input",label:"Username",type:"text",className:"input-field",
        value:this.state.Username,onChange:this.handleChange},
        {tag:"input",label:"Password",type:"password",className:"input-field",
        value:this.state.Password,onChange:this.handleChange}]
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
 
        return(
            <div className="login-container">
                 <form onSubmit={e=>this.onSubmit(e)}>
                {this.renderLoginForm()}
                <button type="submit" className="btn-login">Login</button>
                </form>
                <div className="user-not-found">{this.state.notFound}</div>
           </div>
        )
    }
}
export default withRouter(connect(null,{login})(Login));
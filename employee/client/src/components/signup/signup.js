import React from "react"
import {connect} from "react-redux";
import {signup} from "../../actions/user"
import "./signup.css"
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Username:"",
            Password:"",
            ConfirmPassword:"",
            errorPassword:"",
            errorUsername:"",
            userExists:"",
            signUpDone:""
        }
    }
    handleChange=(value,name)=>{
        this.setState((prevstate)=>{
            return{
            [name]:value
            }
        })
    }
    userExists=(errorData)=>{
        if(errorData){
        this.setState({userExists:errorData});
        }
        console.log(errorData)
        if(errorData===""){
        this.setState({
            signUpDone:"All set.Proceed to Login."
        })
    }
        setTimeout(()=>{this.setState({userExists:"",signUpDone:""})},3000)
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const {ConfirmPassword,Password,Username}=this.state;
        if(ConfirmPassword===Password && Username.length >3){
        
        this.setState({
            errorPassword:"",
            errorUsername:"",
            Username:"",
            Password:"",ConfirmPassword:""
        })
        this.props.signup({Username,Password},this.userExists)
        }
         if(ConfirmPassword!==Password){
            this.setState({errorPassword:"Passwords do not match."})
        }
        if(Username.length<=3){
            this.setState({errorUsername:"Username should be greater than 3 characters"})
        }
    }
    renderSignupForm=()=>{
        const fields=[
        {tag:"input",label:"Username",type:"text",className:"input-field",
        value:this.state.Username,onChange:this.handleChange,
    error:this.state.errorUsername},
        {tag:"input",label:"Password",type:"password",className:"input-field",
        value:this.state.Password,onChange:this.handleChange},
        {tag:"input",label:"ConfirmPassword",type:"password",className:"input-field",
        value:this.state.ConfirmPassword,onChange:this.handleChange,
    error:this.state.errorPassword}
    ]
       return fields.map((field,i)=>{
           if(field.tag==="input"){
            return(
                <React.Fragment>
                <div className="field-container" key={i}>
                <label>{field.label}:</label>
                <input className="input-field" type={field.type} value={field.value} onChange={(e)=>field.onChange(e.target.value,field.label)} />
                </div>
               {field.label!=="Password"? <div className="error-validation">{field.error}</div>:null}
                </React.Fragment>
            )
           }
        })
       
    }
    render(){
    
        return(
           <div className="signup-container">
                <form onSubmit={e=>{this.onSubmit(e)}}>
                {this.renderSignupForm()}
                <button type="submit" className="btn-login" id="btn-signup">Signup</button>
                </form>
                <div className="user-exists-tooltip">{this.state.userExists}</div>
                <div className="user-exists-tooltip" style={{color:"green"}}>{this.state.signUpDone}</div>
                </div>
        )
    }
}
export default connect(null,{signup})(Signup);
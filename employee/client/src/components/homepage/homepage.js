import React,{Component} from "react";
import Login from "../login/login";
import "./homepage.css"
import Signup from "../signup/signup";
class Homepage extends Component{
    constructor(props){
        super(props);
    }
 
    render(){
        console.log(this.props.num)
        return(
            <div className="homepage-container">
                <div className="login-container">
                    <h3 className="headers" onClick={e=>this.props.showLoginHandler()}>Login</h3>
             
                      <div className={this.props.showLogin?"form-container animate-form":"form-container deanimate-form"}>  
       <Login /></div>
                    </div>
               
                <div className="signup-container">
                <h3 className="headers" onClick={e=>this.props.showSignupHandler()}>Signup</h3>
                <div className={this.props.showSignup?"form-container animate-form":"form-container deanimate-form"}>
                <Signup />
                </div>
                </div>
            </div>
        )
    }
}
export default Homepage;
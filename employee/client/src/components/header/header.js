import React from "react";
import "./header.css"
import {connect} from "react-redux"
import {logout} from "../../actions/user"
import {withRouter} from "react-router-dom"
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showLogin:false,
            showSignup:true,
           
        }
    }
    showLoginHandler=()=>{
        this.setState((prevstate)=>{
             return{
                 showLogin:!prevstate.showLogin,
                 showSignup:!prevstate.showSignup
                 
             }
         })
       }
        
       showSignupHandler=()=>{
           this.setState((prevstate)=>{
               return{
                   showSignup:!prevstate.showSignup,
                   showLogin:!prevstate.showLogin
               }
           })
       }
    render(){
        
        return(
            <React.Fragment>
            <div className="header-container">
                <div className="logo" onClick={e=>{this.props.history.push("/")}}>EMPLOYEE PORTAL</div>
                <div className="header-items">
            {this.props.user ? <span className="logout" onClick={e=>{
                this.props.logout();this.props.history.push("/")
            }}>Logout</span>:null}
            {!this.props.user ? <span className="logout" onClick={
                e=>{this.showLoginHandler();this.props.history.push("/login")}}>Login</span>:null
            }
            {!this.props.user ? <span className="logout" onClick={
                e=>{this.showSignupHandler();this.props.history.push("/signup")}}>Signup</span>:null
            }
            </div>
            </div>
          
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>{
return{
    user:state.User.user
}
}
export default withRouter(connect(mapStateToProps,{logout})(Header));
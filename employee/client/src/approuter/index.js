import React from "react";
import {BrowserRouter,Route} from "react-router-dom";
import Header from "../components/header/header";
import Todos from "../components/todos/todos";
import Signup from "../components/signup/signup";
import Login from "../components/login/login"

const renderHomepage=()=>{
    return(
        <div></div>
    )
}
const renderRoutes=()=>{
    const routes=[
        {path:"/login",Component:Login},
        {path:"/",Component:renderHomepage},
        {path:"/todos/:user",Component:Todos},
        {path:"/signup",Component:Signup}
    ]
        return routes.map(route=>{
            return(
                <Route path={route.path} exact component={route.Component} key={route.path}/>
            )
        })
}

export default ()=>{
    return(
        <div>
           
        <BrowserRouter>
      
        <Header />
   {renderRoutes()}
    </BrowserRouter>
    </div>
    )
}
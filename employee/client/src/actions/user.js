import axios from "axios";
export const signup=(data,userExists)=>{
    console.log(data)
    return async dispatch=>{
        try{
        const res=await axios.post("/api/signup",data);
       if(typeof(res.data)==="string"){
        userExists(res.data);
       }
       else{
           userExists("")
       }
        }
        catch{
            console.log("error occured");
        }
    }
}
export const login=(data,history,userNotFound)=>{
    return async dispatch=>{
        const res=await axios.post("/api/login",data)
        console.log(res.data)
        if(Object.keys(res.data).length >0){
            dispatch({
                type:"LOGIN_USER",
                payload:res.data
            })
        history.push(`/todos/${res.data.Username}`);
        }
        else{
            userNotFound("User not Found")
        }
    }
}
export const logout=()=>{
    return{
        type:"LOGOUT_USER",
        payload:undefined
    }
}
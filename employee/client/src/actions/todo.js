import axios from "axios";
import { FETCH_MY_TODOS } from "../constants/type";

export const addTodo=(data,closeCreateTodo)=>{
    return async dispatch=>{
        const res=await axios.post("/api/addTodo",data)
        console.log(res.data)
        dispatch({
            type:FETCH_MY_TODOS,
            payload:res.data
        })
        closeCreateTodo();
    }
}
export const editTodo=(data,closeCreateTodo,activeTodoDone)=>{
    return async dispatch=>{
        const res=await axios.put("/api/editTodo",data)
        console.log(res.data)
        dispatch({
            type:FETCH_MY_TODOS,
            payload:res.data
        })
        closeCreateTodo();
        activeTodoDone();
        
    }
}
export const fetchMyTodos=(data)=>{
    return async dispatch=>{
        const res=await axios.get(`/api/fetchMyTodos?Creator=${data.Creator}`)
        dispatch({
            type:FETCH_MY_TODOS,
            payload:res.data
        })
    }
}
export const deleteTodo=(id,Creator)=>{
    return async dispatch=>{
    const res=await axios.delete(`/api/deleteTodo?id=${id}&Creator=${Creator}`)
    dispatch({
        type:FETCH_MY_TODOS,
        payload:res.data
    })
    }
}
export const markDone=(id,Creator)=>{
    return async dispatch=>{
const res=await axios.put(`/api/markDone`,{id,Creator})
    dispatch({
        type:FETCH_MY_TODOS,
        payload:res.data
    })
}
}
export const markUndone=(id,Creator)=>{
    return async dispatch=>{
    const res=await axios.put(`/api/markUndone`,{id,Creator})
        dispatch({
            type:FETCH_MY_TODOS,
            payload:res.data
        })
    }
}
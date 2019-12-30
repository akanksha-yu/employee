import { FETCH_MY_TODOS } from "../constants/type"

const todoInitialState={}

const todoReducer=(state=todoInitialState,action)=>{
    switch(action.type){
        case FETCH_MY_TODOS:
            return {...state,myTodos:action.payload};
        default:
            return state;
    }
}
export default todoReducer;
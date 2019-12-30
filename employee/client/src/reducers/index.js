import React from "react";
import { combineReducers } from "redux";
import userReducer from "./user"
import todoReducer from "./todo"
export default combineReducers({
        User:userReducer,
        Todos:todoReducer
})
import reducers from "../reducers"
import {createStore,applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
const storeCreate=()=>{
const store=createStore(reducers,{},applyMiddleware(reduxThunk))
return store;
}
export default storeCreate;
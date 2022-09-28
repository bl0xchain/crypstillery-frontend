import { combineReducers } from "redux"
import metamask from "./metamask";
import message from "./message";

const rootReducer = combineReducers({
    metamask: metamask,
    message: message
})

export default rootReducer;
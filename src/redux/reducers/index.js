import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
});

export default rootReducer;

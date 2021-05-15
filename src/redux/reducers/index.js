import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";
import categoryReducer from "./category.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
  categories: categoryReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import helperReducer from "./helper.reducers";
import categoryReducer from "./category.reducers";
import inshortsReducer from "./inshorts.reducers";

const rootReducer = combineReducers({
  helper: helperReducer,
  categories: categoryReducer,
  inshorts: inshortsReducer,
});

export default rootReducer;

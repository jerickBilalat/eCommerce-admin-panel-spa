
import productReducer from "./productReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  products: productReducer
});

export default rootReducer;

import productReducer from "./productReducer";
import user from "./userReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  products: productReducer,
  user
});

export default rootReducer;
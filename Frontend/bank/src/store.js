import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginUseridReducer } from "./reducers/uidreduce";

const finalReducer = combineReducers({
  loginUseridReducer: loginUseridReducer,
});
const currentBankUser = localStorage.getItem("currentBankUser")
  ? JSON.parse(localStorage.getItem("currentBankUser"))
  : null;

const initialState = {
  loginUseridReducer: {
    currentBankUser: currentBankUser,
  },
};

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loading from "./loading/LoadingReducer";
import popup from "./popup/PopupReducer";
import user from "./user/UserReducer";
const store = createStore(
  combineReducers({
    user: user,
    loading: loading,
    popup: popup,
  }),
  {},
  compose(applyMiddleware(thunk))
);

export default store;

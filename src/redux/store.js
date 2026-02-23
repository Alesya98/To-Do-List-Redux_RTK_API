import { legacy_createStore, combineReducers } from "redux";
import inputTextReducer from "./reducers/inputTextReducer";
import taskReducer from "./reducers/taskReduce";
import { filterReducer } from "./reducers/filterReducer";

const store = legacy_createStore(
  combineReducers({
    text: inputTextReducer,
    tasks: taskReducer,
    filter: filterReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

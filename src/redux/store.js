import { configureStore, combineReducers } from "@reduxjs/toolkit";

import inputTextSlice from "./inputTextSlice";
import taskSlice from "./taskSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: combineReducers({
    text: inputTextSlice,
    tasks: taskSlice,
    filter: filterSlice,
  }),
});

export default store;

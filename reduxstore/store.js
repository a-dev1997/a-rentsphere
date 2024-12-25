 import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userdataslice";
import statesData from './getstatesSlice';
 const store=configureStore({
    reducer: {
        userInfo: userDataReducer,
        states:statesData
      },
 })

 export default store;
 import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userdataslice";
import statesData from './getstatesSlice';
import catData from './getcatslice';
 const store=configureStore({
    reducer: {
        userInfo: userDataReducer,
        states:statesData,
        category:catData
      },
 })

 export default store;
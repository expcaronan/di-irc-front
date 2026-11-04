import {configureStore} from "@reduxjs/toolkit";
import authApi from "../../Api/authApi";
import { userAuthReducer } from "../Slice/userAuthSlice";
import userEmpApi from "../../Api/userEmpApi";
import taskDocumentApi from "../../Api/taskDocumentApi";
import notificationApi from "../../Api/notificationApi";

import attendanceApi from "../../Api/attendanceApi";
import aiApi from "../../Api/aiApi";
import leaveApplicationApi from "../../Api/leaveApplicationApi";




const store = configureStore({
reducer:{
    
    userAuthStore: userAuthReducer,
    
    [authApi.reducerPath]: authApi.reducer,
    [userEmpApi.reducerPath]:userEmpApi.reducer,
    [taskDocumentApi.reducerPath]:taskDocumentApi.reducer,
    [notificationApi.reducerPath]:notificationApi.reducer,
    [attendanceApi.reducerPath]:attendanceApi.reducer,
    [aiApi.reducerPath]:aiApi.reducer,
    [leaveApplicationApi.reducerPath]:leaveApplicationApi.reducer
    
},
middleware:(getDefaultMiddleware) => getDefaultMiddleware()
.concat(authApi.middleware)
.concat(userEmpApi.middleware)
.concat(taskDocumentApi.middleware)
.concat(notificationApi.middleware)
.concat(attendanceApi.middleware)
.concat(aiApi.middleware)
.concat(leaveApplicationApi.middleware)
});



export type RootState = ReturnType<typeof store.getState>;
export default store;
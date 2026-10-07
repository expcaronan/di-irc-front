import {configureStore} from "@reduxjs/toolkit";
import authApi from "../../Api/authApi";
import { userAuthReducer } from "../Slice/userAuthSlice";
import userEmpApi from "../../Api/userEmpApi";
import taskDocumentApi from "../../Api/taskDocumentApi";
import notificationApi from "../../Api/notificationApi";

import attendanceApi from "../../Api/attendanceApi";




const store = configureStore({
reducer:{
    
    userAuthStore: userAuthReducer,
    
    [authApi.reducerPath]: authApi.reducer,
    [userEmpApi.reducerPath]:userEmpApi.reducer,
    [taskDocumentApi.reducerPath]:taskDocumentApi.reducer,
    [notificationApi.reducerPath]:notificationApi.reducer,
    [attendanceApi.reducerPath]:attendanceApi.reducer,
    
},
middleware:(getDefaultMiddleware) => getDefaultMiddleware()
.concat(authApi.middleware)
.concat(userEmpApi.middleware)
.concat(taskDocumentApi.middleware)
.concat(notificationApi.middleware)
.concat(attendanceApi.middleware)
});



export type RootState = ReturnType<typeof store.getState>;
export default store;
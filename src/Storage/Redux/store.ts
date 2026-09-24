import {configureStore} from "@reduxjs/toolkit";
import authApi from "../../Api/authApi";
import { userAuthReducer } from "../Slice/userAuthSlice";
import userEmpApi from "../../Api/userEmpApi";




const store = configureStore({
reducer:{
    
    userAuthStore: userAuthReducer,
    
    [authApi.reducerPath]: authApi.reducer,
    [userEmpApi.reducerPath]:userEmpApi.reducer,
    
    
},
middleware:(getDefaultMiddleware) => getDefaultMiddleware()
.concat(authApi.middleware)
.concat(userEmpApi.middleware)
});



export type RootState = ReturnType<typeof store.getState>;
export default store;
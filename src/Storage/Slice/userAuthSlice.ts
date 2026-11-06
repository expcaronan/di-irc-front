import {createSlice} from "@reduxjs/toolkit";
import EmployeeUserModel from "../../Interfaces/EmployeeUserModel";


export const emptyUserState : EmployeeUserModel ={
    employeeId: 0,
    lastName: "",
    firstName: "",
    roleName: "",
    departmentName: "",
    designationName: "",
    rankName: "",
    userName: "",
    email: "",
    roleId: 0,
    departmentId: 0,
    designationId: 0,
    rankId: 0
}


export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState:emptyUserState,
    reducers:{
        setLoggedInUser: (state, action) =>{
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.employeeId = action.payload.employeeId;
            state.roleName = action.payload.roleName;
            state.departmentName = action.payload.departmentName;
            state.designationName = action.payload.designationName;
            state.rankName = action.payload.rankName;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.roleId = action.payload.roleId;
            state.departmentId = action.payload.departmentId;
            state.designationId = action.payload.designationId;
            state.rankId = action.payload.rankId;
        },
    },
});

export const {setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
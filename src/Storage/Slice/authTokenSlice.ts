import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authTokenSlice {
    token: string | null;
}

const initialState: authTokenSlice = {
    token: null
};

const authTokenSlice = createSlice({
    name: "authToken",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
        }
    }
});

export const { setToken, logout } = authTokenSlice.actions;
export const  authTokenReducer = authTokenSlice.reducer;
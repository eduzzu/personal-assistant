"use client";

import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        setLogout: (state) => {
            state.accessToken = null;
        },
    }
});

export const { setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
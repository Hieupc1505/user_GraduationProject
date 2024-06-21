import { createSlice } from "@reduxjs/toolkit";

import { userSignIn, userLogOut, userGetInfo } from "./authAction";

export interface authStateProps {
    isLoad: boolean;
    user: object | null;
    error: string | null;
}

const initialState: authStateProps = {
    isLoad: false,
    user: null,
    error: null,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userSignIn.fulfilled, (state, action) => {
            return {
                isLoad: false,
                user: null,
                error: null,
            };
        });
        builder.addCase(userSignIn.pending, () => {
            return {
                isLoad: true,
                user: null,
                error: null,
            };
        });
        builder.addCase(userLogOut.fulfilled, (state, action) => {
            return {
                isLoad: false,
                user: null,
                error: null,
            };
        });
        builder.addCase(userLogOut.pending, (state, action) => {
            return {
                ...state,
                isLoad: true,
            };
        });
        builder.addCase(userGetInfo.pending, (state, action) => {
            return {
                ...state,
                isLoad: true,
            };
        });
        builder.addCase(userGetInfo.fulfilled, (state, action) => {
            const { payload } = action;

            return {
                isLoad: false,
                user: payload?.data,
                error: null,
            };
        });
    },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

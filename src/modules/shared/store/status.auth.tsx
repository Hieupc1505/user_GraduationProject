import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface statusAuth {
    open: boolean;
}

const initialState: statusAuth = {
    open: false,
};

export const statusAuth = createSlice({
    name: "authControl",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            const { payload } = action;
            // console.log(payload);
            return {
                open: payload,
            };
        },
    },
    // extraReducers(builder) {},
});

// Action creators are generated for each case reducer function
export const { changeStatus } = statusAuth.actions;

export default statusAuth.reducer;

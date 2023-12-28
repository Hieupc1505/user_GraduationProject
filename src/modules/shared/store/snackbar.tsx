import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface statusSnackbar {
    open: boolean;
    message: string;
    status: string;
}

const initialState: statusSnackbar = {
    open: false,
    message: "",
    status: "success",
};

export const statusSnackbar = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            const { payload } = action;
            // console.log(payload);
            return {
                ...state,
                open: payload?.open,
                status: payload?.status ?? "warning",
                message: payload?.message ?? "Lỗi hệ thống, thử lại sau!!",
            };
        },
    },
    // extraReducers(builder) {},
});

// Action creators are generated for each case reducer function
export const { changeStatus } = statusSnackbar.actions;

export default statusSnackbar.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { homeData } from "./homeAction";
import { productProps } from "~/product/store/productSlice";

export interface homeProps {
    selled: productProps[];
    latest: productProps[];
}

export interface authStateProps {
    isLoad: boolean;
    home: homeProps | null;
    error: string | null;
}

const initialState: authStateProps = {
    isLoad: false,
    home: null,
    error: null,
};

const homePending = (state: authStateProps, action: any) => {
    return {
        ...state,
        isLoad: true,
        home: null,
    };
};
const homeReject = (state: authStateProps, action: any) => {
    return {
        ...state,
        isLoad: false,
        home: null,
    };
};

const homeSuccess = (state: authStateProps, action: any) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        home: payload.data,
    };
};

const resetState = () => {
    return {
        isLoad: false,
        home: null,
        error: null,
    };
};

export const homeSlice = createSlice({
    name: "homeControl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(homeData.pending, homePending);
        builder.addCase(homeData.fulfilled, homeSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addhomeInfo, addhomeInfoFail, changeStatusLoad } =
//     homeSlice.actions;

export default homeSlice.reducer;

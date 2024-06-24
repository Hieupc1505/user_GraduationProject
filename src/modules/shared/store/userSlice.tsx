import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserInfoType = {
    displayName: string;
    address: string;
    number: number;
    role: number;
    avatar: string;
};

interface userProps {
    userInfo: UserInfoType;
    liked: [string];
    email: string;
    id: string;
    isEmailVerified: boolean;
    provider: string;
    isDeleted: boolean;
}

import {
    userSignIn,
    userLogOut,
    userGetInfo,
    userSignInByGoogle,
    userSignOut,
} from "./userAction";

export interface authStateProps {
    isLoad: boolean;
    user: userProps | null;
    error: string | null;
}

const initialState: authStateProps = {
    isLoad: false,
    user: null,
    error: null,
};

const userPending = (state: authStateProps, action: any) => {
    return {
        ...state,
        isLoad: true,
        user: null,
    };
};
const userReject = (state: authStateProps, action: any) => {
    return {
        ...state,
        isLoad: false,
        user: null,
    };
};

const userSuccess = (state: authStateProps, action: any) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        user: payload.element.user,
    };
};

const resetState = () => {
    return {
        isLoad: false,
        user: null,
        error: null,
    };
};

export const userSlice = createSlice({
    name: "userControl",
    initialState,
    reducers: {
        addUserInfo: (state, action) => {
            const { payload } = action;
            // console.log(payload);
            return {
                ...state,
                isLoad: false,
                user: payload.element.user,
            };
        },
        addUserInfoFail: (state, action) => {
            const { payload } = action;
            return {
                user: null,
                error: payload.error,
                isLoad: false,
            };
        },
        changeStatusLoad: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                isLoad: payload,
            };
        },
        userError: (state, action) => {
            const { payload } = action;
            return {
                user: null,
                error: payload.error,
                isLoad: false,
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(userLogOut.pending, (state) => {
            return {
                ...state,
                isLoad: true,
            };
        });

        builder.addCase(userSignOut.fulfilled, resetState);

        builder.addCase(userGetInfo.pending, (state, action) => {
            return {
                ...state,
                isLoad: true,
            };
        });
        builder.addCase(userGetInfo.fulfilled, userSuccess);
    },
});

// Action creators are generated for each case reducer function
export const { addUserInfo, addUserInfoFail, changeStatusLoad, userError } =
    userSlice.actions;

export default userSlice.reducer;

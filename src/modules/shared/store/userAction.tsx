import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../api/user.api";
export type userSignInProps = {
    email: string;
    password: string;
};

import { LoginResponse } from "../api/user.api";

import { setHeaderDefault } from "../utils/setHeaderDefault";

export const userSignIn = createAsyncThunk(
    "users/sign-in",
    async (userInfo: userSignInProps, thunkAPI) => {
        const data = await userAPI.login(userInfo);
        if (data && data.success)
            localStorage.setItem("ACCESSTOKEN", data.element.tokens);
    }
);

export const userLogOut = createAsyncThunk("users/log-out", async () => {
    const data = await userAPI.logout();
    localStorage.removeItem("ACCESSTOKEN");
    setHeaderDefault(null);
    return data;
});

export const userGetInfo = createAsyncThunk("users/get-info", async () => {
    const data = await userAPI.getInfo();
    return data;
});
export const userSignOut = createAsyncThunk("users/sign_out", async () => {
    const { data } = await userAPI.logout();
    localStorage.removeItem("ACCESSTOKEN");
    setHeaderDefault(null);
    return data;
});

export const userSignInByGoogle = createAsyncThunk(
    "usser/sing-in/by-google",
    async () => {
        const data: LoginResponse = await userAPI.verifyByGoogle();
        return data;
    }
);

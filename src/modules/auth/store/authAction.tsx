import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../api/user.api";
export type userSignInProps = {
    email: string;
    password: string;
};
import { setHeaderDefault } from "~/shared/utils/setHeaderDefault";

export const userSignIn = createAsyncThunk(
    "users/sign-in",
    async (userInfo: userSignInProps, thunkAPI) => {
        const data = await userAPI.login(userInfo);
        setHeaderDefault(data.element.tokens);
        return data;
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

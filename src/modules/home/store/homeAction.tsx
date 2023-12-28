import { createAsyncThunk } from "@reduxjs/toolkit";
import homeAPI from "../api/home.api";
export type userSignInProps = {
    email: string;
    password: string;
};

// import { LoginResponse } from "../api/user.api";

export const homeData = createAsyncThunk("home/get_list_selled", async () => {
    const data = await Promise.all([
        homeAPI.getTopSelled(),
        homeAPI.getLatest(),
    ]);

    const status = data.every((item) => item.success === true);
    if (status) {
        return {
            data: {
                selled: data[0].element.data,
                latest: data[1].element.data,
            },
        };
    }
});

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/shared/store/userSlice";
import mainSlice from "~/shared/store/mainSlice";
import productSlice from "~/product/store/productSlice";
import cartReducer from "~/cart/store/cartSlice";
import homeReducer from "~/home/store/homeSlice";
import statusAuth from "~/shared/store/status.auth";
import statusSnackbar from "~/shared/store/snackbar";
export type storeType = "userReducer" | "mainSlice";

export const store = configureStore({
    reducer: {
        userReducer,
        mainSlice,
        productSlice,
        cartReducer,
        homeReducer,
        statusAuth,
        snackbar: statusSnackbar,
    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

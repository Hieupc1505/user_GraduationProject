import { type } from "../store/type.store";
import userAPI from "../api/user.api";
import { Dispatch } from "@reduxjs/toolkit";
type AppDispatchType = Dispatch<any>;
import { addUserInfo } from "../store/userSlice";
import { setHeaderDefault } from "./setHeaderDefault";

const loadUser = async (dispatch: AppDispatchType) => {
    if (localStorage[type.ACESSTOKEN]) {
        setHeaderDefault(localStorage[type.ACESSTOKEN]);
    }
    try {
        const res = await userAPI.getInfo();

        if (res.success) {
            dispatch(addUserInfo(res));
        }
    } catch (err) {
        // localStorage.removeItem(type.ACESSTOKEN);
        // setHeaderDefault(null);
        // dispatch(addUserInfoFail());
    }
};

export default loadUser;

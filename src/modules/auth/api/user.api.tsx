// import { axios } from "~app/modules/shared/utils/setHeaderDefault";
import axios from "axios";

import { userSignInProps } from "../store/authAction";
interface LoginResponse {
    success: true;
    element: any;
    message?: string;
}
const userAPI = {
    login: async (userSignInInfo: userSignInProps) => {
        const { data } = await axios.post<LoginResponse>(
            "/api/v1/auth/login",
            userSignInInfo
        );
        return data;
    },
    logout: async () => {
        const { data } = await axios.get(`/api/v1/auth/logout`);
        return data;
    },
    getInfo: async () => {
        const { data } = await axios.get("/api/v1/auth/info");
        return data;
    },
    activeEmail: async (link: string) => {
        const { data } = await axios.get(`/api/v1/auth/activative`);
    },
};

export default userAPI;

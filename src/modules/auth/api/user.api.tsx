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
            "/api/v2/auth/login",
            userSignInInfo
        );
        return data;
    },
    logout: async () => {
        const { data } = await axios.get(`/api/v2/auth/logout`);
        return data;
    },
    getInfo: async () => {
        const { data } = await axios.get("/api/v2/auth/info");
        return data;
    },
};

export default userAPI;

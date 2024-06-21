import axios from "axios";
import { userSignInProps } from "../store/userAction";
import { AxiosError } from "axios";
export interface LoginResponse {
    success: true;
    element: any;
    message?: string;
}

interface formDataLoginFirebaseGoogle {
    email: string;
    displayName: string;
}

const userAPI = {
    login: async (userSignInInfo: userSignInProps) => {
        try {
            const { data } = await axios.post<LoginResponse>(
                "/api/v1/auth/login",
                userSignInInfo
            );
            return data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data.message;
            }
        }
    },
    signup: async (userSignupForm: userSignInProps) => {
        try {
            const { data } = await axios.post<LoginResponse>(
                `/api/v1/auth/register`,
                userSignupForm
            );
            // console.log("data", data);
            if (data && data.success) {
                return data;
            }
        } catch (error: any) {
            if (error.response) {
                return error.response.data.message;
            }
            return "unknow";
        }
    },
    logout: async () => {
        const { data } = await axios.get(`/api/v1/auth/logout`);
        return data;
    },
    getInfo: async () => {
        const { data } = await axios.get("/api/v1/auth/info");
        return data;
    },
    verifyByGoogle: async () => {
        const { data } = await axios.get<LoginResponse>(
            "/api/v1/gg/login/success"
        );
        return data;
    },
    loginFirebaseGoogle: async (formData: formDataLoginFirebaseGoogle) => {
        const { data } = await axios.post<LoginResponse>(
            "/api/v1/gg/login/firebase",
            formData
        );
        // console.log(data);
        return data;
    },
};

export default userAPI;

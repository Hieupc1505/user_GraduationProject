import axios from "axios";
// import { userSignInProps } from "../store/authAction";
interface LoginResponse {
    success: true;
    user: object;
    accessToken: string;
}
const userAPI = {
    activeSendMail: async () => {
        const { data } = await axios.get(`/api/v2/auth/logout`);
        return data;
    },
};

export default userAPI;

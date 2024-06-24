import axios from "axios";

const userAPI = {
    activeSendMail: async () => {
        const { data } = await axios.get(`/api/v2/auth/logout`);
        return data;
    },
};

export default userAPI;

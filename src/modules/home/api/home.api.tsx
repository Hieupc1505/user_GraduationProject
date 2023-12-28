import axios from "axios";

export interface LoginResponse {
    success: true;
    element: any;
    message?: string;
}

const homeAPI = {
    getTopSelled: async () => {
        const { data } = await axios.get<LoginResponse>(
            "/api/v1/product/list/selled?"
        );
        return data;
    },
    getLatest: async () => {
        const { data } = await axios.get<LoginResponse>(
            "/api/v1/product/list/latest"
        );
        return data;
    },
};

export default homeAPI;

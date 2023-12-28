import axios from "axios";

const searchAPI = {
    searchQuery: async (search: string) => {
        const { data } = await axios.get(`/api/v1/product/search${search}`);
        return data;
    },

    // addOrder: async()
};

export default searchAPI;

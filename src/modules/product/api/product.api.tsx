import axios from "axios";

const productAPI = {
    getProductById: async (productId: string) => {
        const { data } = await axios.get(`/api/v1/product/${productId}`);
        return data;
    },
    addLikeProduct: async (productId: string) => {
        const { data } = await axios.post(`/api/v1/product/like`, {
            productId,
        });
        // console.log(data);
        if (data && data.success) return data;
    },
};

export default productAPI;

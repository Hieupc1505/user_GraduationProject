import axios from "axios";

import { cartItemProps } from "../store/cartAction";

const cartAPI = {
    addProductToCart: async (productToCart: cartItemProps) => {
        const { data } = await axios.post(`/api/v1/cart/add`, productToCart);
        return data;
    },
    updateCart: async (productToCart: cartItemProps) => {
        const { data } = await axios.post(`/api/v1/cart/update`, productToCart);
        return data;
    },
    getAllCart: async () => {
        const { data } = await axios.get("/api/v1/cart/all");
        return data;
    },
    deleteItemCart: async (products: { k: string }) => {
        const { data } = await axios.post("/api/v1/cart/delete", products);
        return data;
    },
    // addOrder: async()
};

export default cartAPI;

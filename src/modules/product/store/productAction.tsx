import { createAsyncThunk } from "@reduxjs/toolkit";

export type userSignInProps = {
    email: string;
    password: string;
};

export interface cartItemProps {
    productId: string;
    price: number;
    quantity: number;
    options: string;
}

import productAPI from "../api/product.api";

export interface getProductProps {
    id?: string;
}

export const getProductById = createAsyncThunk(
    "product/gey-by-id",
    async (id?: string) => {
        if (!id) return;
        const data = await productAPI.getProductById(id);
        return data;
    }
);

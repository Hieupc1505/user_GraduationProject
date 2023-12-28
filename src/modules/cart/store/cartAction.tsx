import { createAsyncThunk } from "@reduxjs/toolkit";
import cartAPI from "../api/cart.api";

export interface cartItemProps {
    productId: string;
    price: number;
    quantity: number;
    selected: string;
}

export interface cartStoreItem {
    productId: string;
    price: number;
    type: string;
    quantity: number;
    options: {
        key: string;
        value: string[];
    }[];
    name: string;
    brand: string;
    inventory: number;
    sale: number;
    img: string;
}

export type deleteItemCartProps = string[];

export const addToCart = createAsyncThunk(
    "product/add-cart",
    async (itemCart: cartItemProps) => {
        const data = cartAPI.addProductToCart(itemCart);
        return data;
    }
);
export const updateCart = createAsyncThunk(
    "product/update-cart",
    async (itemCart: cartItemProps) => {
        const data = cartAPI.updateCart(itemCart);
        return data;
    }
);

export const getAllCart = createAsyncThunk("cart/get-all", async () => {
    const data = cartAPI.getAllCart();
    return data;
});

export const deleteItemCart = createAsyncThunk(
    "cart/delete-item",
    async (listId: deleteItemCartProps) => {
        const data = await cartAPI.deleteItemCart({
            k: JSON.stringify(listId),
        });
        return data;
    }
);

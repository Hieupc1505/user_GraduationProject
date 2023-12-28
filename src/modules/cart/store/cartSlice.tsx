import { createSlice } from "@reduxjs/toolkit";

export interface cartItemProps {
    productId: string;
    quantity: number;
    type: string;
    price: number;
    sale: number;
    name: string;
    brand: string;
    inventory: number;
    img: string;
    options: { key: string; value: string[] }[];
}

export interface cartStoreProps {
    isLoad: boolean;
    cart: cartItemProps[];
    error: string | null;
}

const initialState: cartStoreProps = {
    isLoad: false,
    cart: [],
    error: null,
};

const cartPending = (state: cartStoreProps, action: any) => {
    return {
        ...state,
        isLoad: true,
    };
};

const cartSuccess = (state: cartStoreProps, action: any) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        cart: payload.element.cart,
    };
};

const deleteCartFulfilled = (state: cartStoreProps, action: any) => {
    const { payload } = action; //payload.lists

    return {
        ...state,
        isLoad: false,
        cart: payload.element.cart,
    };
};

const getCartReject = (state: cartStoreProps, action: any) => {
    return {
        ...state,
        isLoad: false,
        cart: [],
    };
};

import {
    getAllCart,
    deleteItemCart,
    updateCart,
    addToCart,
} from "./cartAction";

export const cartSlice = createSlice({
    name: "prodControl",
    initialState,
    reducers: {
        resetCart: (state) => {
            return {
                ...state,
                isLoad: false,
                cart: [],
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(getAllCart.pending, cartPending);
        builder.addCase(getAllCart.fulfilled, cartSuccess);
        builder.addCase(getAllCart.rejected, getCartReject);
        builder.addCase(deleteItemCart.pending, cartPending);
        builder.addCase(deleteItemCart.fulfilled, deleteCartFulfilled);
        builder.addCase(updateCart.fulfilled, cartSuccess);
        builder.addCase(updateCart.rejected, getCartReject);
        builder.addCase(addToCart.pending, cartPending);
        builder.addCase(addToCart.fulfilled, cartSuccess);
    },
});

// Action creators are generated for each case reducer function
export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;

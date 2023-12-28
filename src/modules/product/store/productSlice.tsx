import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OptionProps {
    key: string;
    value: string[];
}

interface inventoryProps {
    selled: number;
    quantity: number;
    reservations: any;
}

export interface ProductImagesProps {
    main: string;
    list: string[];
}

export interface productProps {
    name: string;
    price: number;
    brand: string;
    description: string;
    release_date: string;
    rates: (string | number)[];
    options: OptionProps[];
    specs: OptionProps[];
    inventory: inventoryProps;
    images: ProductImagesProps;
    _id?: string;
}

export interface prodStateProps {
    isLoad: boolean;
    product: productProps | null;
    error: string | null;
}

const initialState: prodStateProps = {
    isLoad: false,
    product: null,
    error: null,
};

const productPending = (state: prodStateProps, action: any) => {
    return {
        ...state,
        isLoad: true,
        product: null,
    };
};

const productSuccess = (state: prodStateProps, action: any) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        product: payload.element.product,
    };
};

import { getProductById } from "./productAction";

export const productSlice = createSlice({
    name: "prodControl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProductById.pending, productPending);
        builder.addCase(getProductById.fulfilled, productSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addUserInfo, addUserInfoFail } = productSlice.actions;

export default productSlice.reducer;

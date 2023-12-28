import { createSlice } from "@reduxjs/toolkit";

export interface homeStateProps {
    lang: "vn" | "en";
    modeTheme: "light" | "dark";
}

const initialState: homeStateProps = {
    lang: "vn",
    modeTheme: "light",
};

export const mainSlice = createSlice({
    name: "homeControl",
    initialState,
    reducers: {
        changeMode: (state) => {
            if (state.modeTheme === "light") {
                state.modeTheme = "dark";
            } else {
                state.modeTheme = "light";
            }
        },
        changeLanguage: (state) => {
            if (state.lang === "vn") {
                state.lang = "en";
            } else {
                state.lang = "vn";
            }
        },
    },
    // extraReducers(builder) {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { changeMode, changeLanguage } = mainSlice.actions;
export default mainSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false
};

export const globalSlice = createSlice({
    name: "globals",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }
});

export const { toggleDarkMode } = globalSlice.actions;

export default globalSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ThemeState = {
    value: "light" | "dark"
}

const initialState: ThemeState = {
    value: "light"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string | null>) => {
            const theme = action.payload;

            if (theme === "light" || theme === "dark") {
                state.value = theme;
            } else {
                state.value = "light";
            }

        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
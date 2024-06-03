import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetMeDto } from "../../api/auth/dto/GetMeDto";

type User = GetMeDto;

type AuthState = {
    user: User | null;
};

const initialState: AuthState = {
    user: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    }
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;